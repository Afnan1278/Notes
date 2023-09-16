# Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules/
RUN npm install
# uninstall the current bcrypt modules
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt
COPY . .

CMD ["npm", "start"]
