FROM node:22.0.0-alpine3.19
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json yarn.lock ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start"]
