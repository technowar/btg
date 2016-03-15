'use strict';

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
    const Question = this.model('Question');
    const newQuestion = new Question({
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

module.exports = routes;
