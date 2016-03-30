'use strict';

const render = require('../lib/render');
const routes = [];

// Home
routes.push({
  method: 'get',
  path: '/',
  *handler() {
    const Questions = this.model('Question');
    const qList = yield Questions.find({
      answer: {
        $ne: ''
      },
      deleted: false
    }).sort({
      updatedAt: -1
    }).limit(10).exec();

    const data = {
      title: 'Buanga This Guy!',
      user: this.session.user,
      questions: qList,
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

// Suggestion Page
routes.push({
  method: 'get',
  path: '/suggestion',
  *handler() {
    const data = {
      title: 'Suggestion - Buanga This Guy!',
      user: this.session.user,
      flash: {
        error: this.flash('error'),
        notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('suggestion', data);
  }
});

// About Page
routes.push({
  method: 'get',
  path: '/about',
  *handler() {
    const data = {
      title: 'About - Buanga This Guy!',
      user: this.session.user,
      flash: {
        error: this.flash('error'),
        notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('about', data);
  }
});

// FAQ Page
routes.push({
  method: 'get',
  path: '/faq',
  *handler() {
    const data = {
      title: 'FAQ - Buanga This Guy!',
      user: this.session.user,
      flash: {
        error: this.flash('error'),
        notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('faq', data);
  }
});

module.exports = routes;
