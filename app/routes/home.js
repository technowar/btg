'use strict';

const render = require('../lib/render');
const routes = [];

// Home
routes.push({
  method: 'get',
  path: '/',
  *handler() {
    this.body = yield render('home', { title: 'Buanga This Guy!',
                                       user: this.session.user,
                                       csrf: this.csrf
                                     });
  }
});

// Beep
routes.push({
  method: 'get',
  path: '/count',
  *handler() {
    this.session.count = this.session.count || 0;
    this.session.count++;
    this.body = `Count: ${this.session.count}`;
  }
});

module.exports = routes;
