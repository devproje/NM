FROM node:20-alpine3.17

COPY ./src .
COPY ./package.json .
COPY ./.env .

RUN apk update
RUN apk install python

RUN npm install -g pnpm
RUN pnpm install

ENTRYPOINT [ "pnpm", "start" ]
