'use strict';

const render = require('./render');

module.exports = function (handler) {
  const handlers = {
    *notfound(next) {
      yield next;

      if (this.status !== 404) return;

      const data = {
        title: '404 - Page Not Found',
        user: this.session.user
      };

      this.status = 404;
      this.body = yield render('error', data);
    }
  };

  return handlers[handler];
};
