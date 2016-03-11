'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (router) => {
  // First read all .js files excluding this file `index.js`
  const files = fs.readdirSync(path.join(__dirname, './'));

  files.forEach((file) => {
    // Exclude `index.js` and none JS files
    if (file.match(/index.js/i) || !file.match(/.js$/i)) {
      return;
    }

    // Require each file
    let routes = require(path.join(__dirname, file));

    // Sometimes route only export a single
    // object instead of an array so we have
    // to make sure we handle it properly by
    // encapsulating the object in an array.
    if (!Array.isArray(routes)) {
      routes = [routes];
    }

    routes.forEach((route) => {
      const method = route.method.toLowerCase();
      const url = route.path;
      const handler = route.handler;

      // Add route
      router[method](url, handler);
    });
  });
};
