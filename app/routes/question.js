'use strict';

const mongoose = require('mongoose');

module.exports = {
  method: 'post',
  path: '/question',

  // Handler
  // Note: please use es6 object-shorthand
  *handler() {
    const body = yield this.request.urlencoded();
    const Question = mongoose.model('Question');
    const newQuestion = new Question({
      content: body.question
    });

    newQuestion.save((error) => {
      if (error) {
        this.body = error;

        return;
      }

      this.redirect('/');
    });
  }
};
