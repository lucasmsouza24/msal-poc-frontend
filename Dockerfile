# app build
FROM node:24.13.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

# web server
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
