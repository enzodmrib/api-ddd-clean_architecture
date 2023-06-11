FROM node:lts

WORKDIR /usr/src/app/

COPY package*.json ./
RUN npm install 

COPY . .

EXPOSE 3333

CMD ["/bin/bash", "-c", "npm run build;npm start"]

