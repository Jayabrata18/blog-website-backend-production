FROM node:20 

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD [ "npm", 'run', 'dev']