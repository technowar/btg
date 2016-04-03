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

    const Users = this.model('User');
    const Questions = this.model('Question');

    const user = this.session.user;
    const newQuestion = new Questions({
      text: body.question
    });

    newQuestion.save((error, data) => {
      if (error) {
        this.body = error;

        return;
      }

      Users.likedQuestions(data._id, user._id, (err) => {
        if (err) {
          this.body = err;

          return;
        }
      });

      Questions.likes(data._id, user._id, (err) => {
        if (err) {
          this.body = err;

          return;
        }

        this.redirect('/');
      });
    });
  }
});

routes.push({
  method: 'post',
  path: '/question/:_id/like',
  filters: ['userSession'],

  *handler() {
    const Users = this.model('User');
    const Questions = this.model('Question');

    const user = this.session.user;

    Users.likedQuestions(this.params._id, user._id, (err) => {
      if (err) {
        this.body = err;

        return;
      }
    });

    Questions.likes(this.params._id, user._id, (err) => {
      if (err) {
        this.body = err;

        return;
      }

      this.redirect('/');
    });
  }
});

module.exports = routes;
