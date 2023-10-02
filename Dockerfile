FROM node:20-alpine3.17

COPY ./src .
COPY ./package.json .

RUN npm install -g pnpm
RUN pnpm install

ENTRYPOINT [ "pnpm", "start" ]
