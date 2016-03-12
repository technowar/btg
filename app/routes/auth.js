'use strict';

const routes = [];

// Facebook Callback
routes.push({
  method: 'get',
  path: '/fb/callback',
  *handler() {
    const User = this.model('User');

    /**
     * This request returns an array
     *
     * headers = fbRequest[0]
     * body    = fbRequest[1]
     */
    const response = yield this.facebook
      .query()
      .get('me')
      .auth(this.request.query.access_token)
      .request();

    const responseBody = response[1];

    // Check if user exist
    let result = yield User.findOne(responseBody.id).exec();

    // If not then let's save user to db
    if (!result) {
      let user = new User({
        _id: responseBody.id,
        name: responseBody.name
      });

      try {
        yield user.save();
      } catch (e) {
        this.flash('error', e.message);
        user = undefined;
      }

      result = user;
    }

    if (result) {
      this.session.user = result;
    }

    this.redirect('/');
  }
});

// Logout
routes.push({
  method: 'get',
  path: '/logout',
  *handler() {
    // Purge user session, then redirect
    delete this.session.user;
    this.redirect('/');
  }
});

module.exports = routes;

