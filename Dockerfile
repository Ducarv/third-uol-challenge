FROM node:20.10 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20.10

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/app.js"]
