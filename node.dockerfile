FROM node:16
WORKDIR /
COPY package.json .
RUN npm install --quiet
WORKDIR /app
COPY . .
