'use strict';

const render = require('../lib/render');
const routes = [];

// Home
routes.push({
  method: 'get',
  path: '/',
  *handler() {
    this.body = yield render('home', { title: 'Buanga This Guy!' });
  }
});

// Beep
routes.push({
  method: 'get',
  path: '/beep',
  *handler() {
    this.body = 'beeep boop!';
  }
});

module.exports = routes;
