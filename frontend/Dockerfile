# Stage 1: Build the React application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:stable-alpine as production-stage
COPY ./nginx.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
