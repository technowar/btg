'use strict';

const mongoose = require('mongoose');

module.exports = {
  method: 'post',
  path: '/question',

  // Handler
  // Note: please use es6 object-shorthand
  *handler() {
    const Question = mongoose.model('Question');
    const newQuestion = new Question({
      content: this.request.body.question
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
