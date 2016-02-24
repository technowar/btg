'use trict';

const render = require('../lib/render');

module.exports = (router) => {
  router.get('/', function* (next) {
    this.body = yield render('home', {title: 'Buanga This Guy!'});
  });
};
