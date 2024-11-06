FROM node:20.18.0 as base
LABEL maintainer="TuanNN27"
WORKDIR /app
COPY package*.json .
COPY yarn.lock .
RUN yarn install
COPY . .

from base as builder
WORKDIR /app
RUN yarn build

from node:20.18.0-alpine as production
LABEL maintainer="TuanNN27"
ARG APP_PORT=3000
WORKDIR /app
COPY package*.json .
COPY yarn.lock .
RUN yarn install --prod
COPY --from=builder /app/.next /app/.next
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
