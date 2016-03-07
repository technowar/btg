'use strict';

const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body')();

module.exports = (router) => {
  // First read all .js files excluding this file `index.js`
  const files = fs.readdirSync(path.join(__dirname, './'));

  files.forEach((file) => {
    // Exclude `index.js` and none JS files
    if (file.match(/index.js/i) || !file.match(/.js$/i)) {
      return;
    }

    const route = require(path.join(__dirname, file));
    const method = route.method.toLowerCase();
    const url = route.path;
    const handler = route.handler;

    router[method](url, koaBody, handler);
  });
};
