'use strict';

module.exports = {
  name: 'adminonly',

  *handler(next) {
    const user = this.session.user;

    if (!user || !user.role.match(/admin/i)) {
      this.redirect('/');
      return;
    }

    yield next;
  }
};
