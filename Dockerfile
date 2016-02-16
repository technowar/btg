from node:5.5.0

# Set NODE_PATH to /deps
RUN ["mkdir", "/deps"]
ADD ["./package.json", "/deps"]
WORKDIR /deps
RUN npm install
ENV NODE_PATH=/install/node_modules

EXPOSE 3000

WORKDIR /usr/src
COPY . /usr/src

CMD [ "/usr/local/bin/npm", "start" ]
