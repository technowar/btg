'use trict';

const render = require('../lib/render');

exports.getHome = function* () {
  this.body = yield render('home', {title: 'Home'});
};
