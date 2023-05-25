FROM node:17.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_BACKEND_URL http://exercise-7-authentication-dev.us-east-1.elasticbeanstalk.com
RUN npm run build

FROM nginx:stable-alpine as prod-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]