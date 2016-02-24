const Zombie = require('zombie');
const HTML5 = require('html5');

// Should
require('should');
// App
require('../../server');

const World = function () {
  this.browser = new Zombie({
    runScripts: true,
    debug: false,
    htmlParser: HTML5
  });

  this.page = function (path) {
    return `http://localhost:${process.env.PORT}${path}`;
  };

  this.visit = function (path, callback) {
    this
    .browser
    .visit(
      this.page(path),
      (err, browser, status) => {
        callback(err, browser, status);
      }
    );
  };
};

module.exports = function () {
  this.World = World;
};
