FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 4000

ENV PORT=4000
ENV DB_HOST=host.docker.internal

CMD ["yarn","start"]
