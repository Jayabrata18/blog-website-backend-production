FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=5555


COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

RUN npm ci --only=production

EXPOSE 5555

CMD ["node", "dist/server.js"]
