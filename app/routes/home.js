'use strict';

const render = require('../lib/render');

module.exports = {
  method: 'get',
  path: '/',

  // Handler
  // Note: please use es6 object-shorthand
  *handler() {
    this.body = yield render('home', { title: 'Buanga This Guy!' });
  }
};
