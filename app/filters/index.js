'use strict';

const fs = require('fs');
const path = require('path');

module.exports = () => {
  const middlewares = {};

  // First read all .js files excluding this file `index.js`
  const files = fs.readdirSync(path.join(__dirname, './'));

  files.forEach((file) => {
    // Exclude `index.js` and none JS files
    if (file.match(/index.js/i) || !file.match(/.js$/i)) {
      return;
    }

    let filters = require(path.join(__dirname, file));

    if (!Array.isArray(filters)) {
      filters = [filters];
    }

    filters.forEach((filter) => {
      const name = filter.name;
      const handler = filter.handler;

      // Add filter
      middlewares[name] = handler;
    });
  });

  return middlewares;
};

