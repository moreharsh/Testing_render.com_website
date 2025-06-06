# node 22.13.0 version used
FROM node:22.13.0

WORKDIR /Application_frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
