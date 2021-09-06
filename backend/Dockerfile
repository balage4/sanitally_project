FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

ENV PORT=5000
ENV DB_HOST=host.docker.internal

CMD ["yarn","start"]
