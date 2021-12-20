FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

ENV PORT=5001
ENV DB_HOST=host.docker.internal

CMD ["yarn","start"]
