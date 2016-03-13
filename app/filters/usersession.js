'use strict';

/**
 * So what exactly does filters do?
 *
 * Filters are just generators/function that act
 * as a middleware.
 *
 *
 * To register a filter,
 * you just have to export and
 * object that contains:
 *
 * - name of type {string}
 * - handler of type {generator}
 */

module.exports = {
  name: 'userSession',

  *handler(next) {
    // If session does not exist
    // just redirect to the /
    if (!this.session.user) {
      this.redirect('/');
      return;
    }

    // otherwise, pass in the next handler
    yield next;
  }
};
