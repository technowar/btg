'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (filters, router) => {
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

      let handlers = [];

      // If this route has filters then we include them
      if (route.filters) {
        handlers = route.filters.map((flt) => filters[flt]);
      }

      // Handler should be last of the middleware stack
      handlers.push(handler);

      // This is the power of koa-router and middleware based fw
      // it enables us to add multiple handlers
      //
      // And look at them spread operators bitches!!!
      router[method].call(router, url, ...handlers);
    });
  });
};
