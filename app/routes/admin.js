'use strict';

const render = require('../lib/render');
const routes = [];

// Admin
routes.push({
  method: 'get',
  path: '/admin',
  filters: ['userSession', 'adminOnly'],

  *handler() {
    const data = {
      title: 'Admin - Buanga This Guy!',
      user: this.session.user,
      flash: {
        error: this.flash('error'),
        notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('admin', data);
  }
});

// Admin/questions
routes.push({
  method: 'get',
  path: '/admin/questions',
  filters: ['userSession', 'adminOnly'],

  *handler() {
    const Question = this.model('Question');

    const qList = yield Question.find({
      deleted: false
    }).sort({
      createdAt: -1
    }).limit(10).exec();

    const data = {
      title: 'Admin | Questions - Buanga This Guy!',
      user: this.session.user,
      questions: qList,
      flash: {
        error: this.flash('error'),
        notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('questions', data);
  }
});

module.exports = routes;
