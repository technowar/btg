/**
 * Sadly ES6 doesn't work here
 * unless we do some transpiling
 * and shit.
 *
 * So write with legacy JS kids ;P
 *
 */
module.exports = function () {
  this.Given(/^I visit "(\/)" page$/, function (text, callback) {
    this.visit(text, callback);
  });

	    this.Then(/^it should have a title "([^"]*)"$/, function (text, callback) {
  this.browser.text('title').should.match(new RegExp(text));
  callback();
});

  this.Then(/^should see some "([^"]*)"$/, function (text, callback) {
    this.browser.text('body').should.match(new RegExp(text));
    callback();
  });

  this.Then(/^some "([^"]*)"$/, function (text, callback) {
    this.browser.text('body').should.match(new RegExp(text));
    callback();
  });

};
