FROM node:9.3.0

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start
