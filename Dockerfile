FROM node:10.23.0-alpine

RUN apk update && apk add yarn

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "build"]

EXPOSE 3000