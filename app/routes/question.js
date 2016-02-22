'use trict';

const render = require('../lib/render');

exports.getQuestion = function* () {
  this.body = yield render('question', {title: 'Question'});
};
