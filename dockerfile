FROM node:16.10

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]