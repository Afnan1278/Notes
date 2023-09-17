# Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules/
RUN npm install
COPY . .

CMD ["npm", "start"]
