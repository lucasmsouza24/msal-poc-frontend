.PHONY: push docker-up docker-down k8s-frontend-up k8s-frontend-down ingress-up setup-ingress update-hosts wait-ingress cert-install

# pushing to remote repositories
push:
	git push origin main
	git push azure main

# frontend docker
docker-up:docker-down
	docker build -t msal-poc-frontend .
	docker run --env-file .env -p 5173:80 -d -it --name msal-poc-frontend msal-poc-frontend
	docker logs msal-poc-frontend -f

docker-down:
	docker stop msal-poc-frontend || true
	docker rm msal-poc-frontend || true

# frontend k8s
k8s-frontend-up: k8s-frontend-down
	minikube image build -t msal-poc-frontend .
	kubectl apply -f .k8s/service.yaml
	kubectl apply -f .k8s/deployment.yaml
	sleep 3
	kubectl logs service/msal-app-service -f

k8s-frontend-down:
	kubectl delete deployment msal-app-deployment || true
	kubectl delete service msal-app-service || true

# k8s config ingress

MINIKUBE_IP := $(shell minikube ip)
DOMAIN := msal.local

setup-ingress:
	minikube addons enable ingress
	kubectl wait --namespace ingress-nginx \
		--for=condition=complete job/ingress-nginx-admission-create \
		--timeout=300s
	kubectl wait --namespace ingress-nginx \
		--for=condition=complete job/ingress-nginx-admission-patch \
		--timeout=300s
	for i in 1 2 3 4 5; do \
		kubectl apply -f ingress/.k8s/ingress.yaml && break || sleep 5; \
	done

update-hosts:
	sudo sed -i '/$(DOMAIN)/d' /etc/hosts
	echo "$(MINIKUBE_IP) $(DOMAIN)" | sudo tee -a /etc/hosts

ingress-up: cert-install
	$(MAKE) setup-ingress
	$(MAKE) update-hosts
	@echo "Application available at: http://$(DOMAIN)"

cert-install:
	@command -v mkcert >/dev/null 2>&1 || { \
		echo "⚠️  mkcert not installed. Install it first."; \
		exit 1; \
	}
	mkcert -install
	mkcert msal.local
	kubectl create secret tls msal-local-tls \
	--cert=msal.local.pem \
	--key=msal.local-key.pem

# k8s complete build
k8s-build:
	make ingress-up
	make k8s-frontend-up
