FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./prisma prisma

RUN npm install
RUN npx prisma generate

COPY . .
EXPOSE 8080
CMD [ "node", "src/server.js" ]