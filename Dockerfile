FROM node:20.10
WORKDIR /usr/src/app
COPY package.json yarn.lock package-lock.json ./
RUN yarn install --frozen-lockfile
RUN npx prisma generate
COPY . .
CMD ["yarn", "start"]