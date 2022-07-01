FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY . .

RUN yarn --frozen-lockfile

RUN yarn build

FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
