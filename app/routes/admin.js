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
    const Questions = this.model('Question');
    const qList = yield Questions.find({
      deleted: false,
      answer: {
        $eq: ''
      }
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

// Admin/answer
routes.push({
  method: 'post',
  path: '/admin/answer',
  filters: ['userSession', 'adminOnly'],

  *handler() {
    const body = yield this.request.urlencoded();

    // Mag protection, mag trust
    // quality CSRF condom este token
    try {
      this.assertCSRF(body);
    } catch (err) {
      this.status = 403;
      this.body = {
        message: 'This CSRF token is invalid!'
      };

      return;
    }

    const _id = body._id;
    const Questions = this.model('Question');

    const answerQuestion = yield Questions.findById(_id).exec();

    answerQuestion.answer = body.answer;
    answerQuestion.save((error) => {
      if (error) {
        this.body = error;

        return;
      }

      this.redirect('/admin/questions');
    });
  }
});

module.exports = routes;
