FROM node:20-alpine3.17

WORKDIR /opt/bot

# copy node.js sources
COPY ./index.js .
COPY ./commands ./commands
COPY ./data ./data
COPY ./events ./events
COPY ./lavalink ./lavalink
COPY ./utils ./utils

# copy configuration file
COPY ./package.json .
COPY ./.env .

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake \
    pkgconfig \
    python3 \
    pixman

RUN npm install -g pnpm
RUN pnpm install

ENTRYPOINT [ "pnpm", "start" ]
