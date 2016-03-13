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

// Profiles Page
routes.push({
  method: 'get',
  path: '/profile',
  *handler() {
    const data = {
      title: 'Profile - Buanga This Guy!',
      user: this.session.user,
      flash: {
        error: this.flash('error'),
        notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('profile', data);
  }
});

module.exports = routes;
