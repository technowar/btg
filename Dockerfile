from node:5.5.0

# Set NODE_PATH to /deps
RUN ["mkdir", "/deps"]
ADD ["./package.json", "/deps"]
WORKDIR /deps
RUN ["/usr/local/bin/npm", "install"]
ENV NODE_PATH=/deps/node_modules

EXPOSE 3000

WORKDIR /usr/src
COPY . /usr/src

CMD "/deps/node_modules/.bin/nodemon"
