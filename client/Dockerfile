FROM node:16-alpine3.11

WORKDIR /user/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY .  .

EXPOSE 3000

CMD ["npm", "start"]
