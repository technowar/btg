'use strict';

const render = require('../lib/render');
const routes = [];

// Home
routes.push({
  method: 'get',
  path: '/',
  *handler() {
    const data = {
      title: 'Buanga This Guy!',
      user: this.session.user,
      flash: {
        error: this.flash('error'),
        notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('home', data);
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
