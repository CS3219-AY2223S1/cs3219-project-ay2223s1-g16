FROM node
WORKDIR /
COPY package.json .
RUN npm install --quiet
COPY . .
CMD [ "npm", "run", "dev"]
