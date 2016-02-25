from node:argon

RUN mkdir /deps
ADD ./package.json /deps
WORKDIR /deps
RUN npm install --ignore-scripts --unsafe-perm
ENV NODE_PATH=/deps/node_modules

EXPOSE 3000

WORKDIR /app
COPY . /app

CMD /deps/node_modules/.bin/pm2 start --watch server.js && /deps/node_modules/.bin/pm2 logs
