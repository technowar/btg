'use trict';
const render = require('../lib/render');

module.exports = (router) => {
  router.get('/', function* () {
    // Get the user model
    const User = this.models('User');

    /**
     * Bootstrap application if there are no current
     * user.
     *
     * First person to login will be the `admin`
     */
    const user = yield User.find({}).exec();
    if (user.length < 1) {
      this.body = yield render('bootstrap', { title: 'Way Sud Dong!' });
    } else {
      this.body = yield render('home', { title: 'Buanga This Guy!' });
    }
  });
};
