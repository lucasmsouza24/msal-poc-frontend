.PHONY: push docker-up docker-down

push:
	git push origin main
	git push azure main

docker-up:docker-down
	docker build -t msal-poc-frontend .
	docker run --env-file .env -p 5173:80 -d -it --name msal-poc-frontend msal-poc-frontend
	docker logs msal-poc-frontend -f

docker-down:
	docker stop msal-poc-frontend || true
	docker rm msal-poc-frontend || true
