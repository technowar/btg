'use strict';

const render = require('../lib/render');
const routes = [];

routes.push({
  method: 'post',
  path: '/question',

  // Handler
  // Note: please use es6 object-shorthand
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

    const User = this.session.user;
    const Questions = this.model('Question');
    const newQuestion = new Questions({
      text: body.question,
      user: User
    });

    newQuestion.save((error) => {
      if (error) {
        this.body = error;

        return;
      }

      this.redirect('/');
    });
  }
});

routes.push({
  method: 'get',
  path: '/question/:id',

  // Handler
  // Note: please use es6 object-shorthand
  *handler() {
    const Questions = this.model('Question');
    const theQuestion = yield Questions.findOne({
      _id: this.params.id,
      deleted: false
    }).exec();

    const data = {
      title: 'Questions - Buanga This Guy!',
      user: this.session.user,
      question: theQuestion,
      flash: {
	error: this.flash('error'),
	notice: this.flash('notice')
      },
      csrf: this.csrf
    };

    this.body = yield render('question', data);
  }
});

module.exports = routes;
