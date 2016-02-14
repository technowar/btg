var Zombie  = require('zombie');
var request = require('supertest');
var should  = require('should');
var HTML5   = require('html5');
var server  = require('../../server');

var World = function () {
  this.browser = new Zombie({
    runScripts : true,
    debug      : false,
    htmlParser : HTML5
  });

  this.page = function (path) {
    return "http://localhost:" + 3000 + path;
  }

  this.visit = function (path, callback) {
    this
    .browser
    .visit(
      this.page(path),
      function (err, browser, status) {
        callback(err, browser, status);
      }
    );
  }

};

module.exports = function () {
  this.World = World;
};
