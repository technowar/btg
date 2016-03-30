'use strict';

const routes = [];

// Admin/users/promote
routes.push({
  method: 'get',
  path: '/promote/:_id',
  filters: ['userSession', 'adminOnly'],

  *handler() {
    const Users = this.model('User');
    const user = yield Users.findById(this.params._id).exec();

    user.role = 'admin';
    user.save((error) => {
      if (error) {
        this.body = error;

        return;
      }

      this.redirect('/admin/users');
    });
  }
});

module.exports = routes;
