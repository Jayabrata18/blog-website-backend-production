FROM Node:20-alpine As base

WORKDIR  /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", 'run', 'dev']