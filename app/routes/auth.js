'use strict';

const routes = [];

// Facebook Callback
routes.push({
  method: 'get',
  path: '/fb/callback',

  *handler() {
    const User = this.model('User');

    // Get user details from facebook
    const fbUser = (yield this.facebook
      .query()
      .get('me?fields=id,name,email,picture')
      .auth(this.request.query.access_token)
      .request())[1]; // Returns an array. [0] -> headers, [1] -> body/content

    // Check for token validity
    if (fbUser.error) {
      this.flash('error', fbUser.error.message);
      this.redirect('/');
      return;
    }

    const totalUsers = yield User.count().exec();
    let result = yield User.findById(fbUser.id).exec();
    // create and save to db if user doesn't exist
    if (!result) {
      let user = new User({
        _id: fbUser.id,
        name: fbUser.name,
        picture: fbUser.picture.data.url,
        email: fbUser.email || ''
      });

      if (totalUsers === 0) {
        user.role = 'admin';
        this.flash('notice', 'As a first time user, I hereby grant you SUPERUSER access. Grats!!!');
      }

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
  filters: ['auth'], // Middleware awesomeness!!!

  *handler() {
    // Purge user session, then redirect
    delete this.session.user;
    this.redirect('/');
  }
});

module.exports = routes;
