FROM node:21-alpine

WORKDIR /home/node/app

COPY . .

RUN chown -R node:node .

USER node

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "host"]