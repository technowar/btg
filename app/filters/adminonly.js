'use strict';

/**
 * ADMIN ONLY FILTER
 *
 * This check if user has
 * an `admin` role and redirects
 * back to `/` if otherwise.
 */
module.exports = {
  name: 'adminOnly',

  *handler(next) {
    const user = this.session.user || { role: '' };

    if (!user.role || !user.role.match(/admin/i)) {
      this.redirect('/');
      return;
    }

    yield next;
  }
};
