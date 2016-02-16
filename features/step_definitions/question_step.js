module.exports = function () {
  this.Given(/^I visit "(\/question)" page$/, function (text, callback) {
    this.visit(text, callback);
  });

  this.Then(/^it should have a title "([^"]*)"$/, function (text, callback) {
    this.browser.text('title').should.match(new RegExp(text));
    callback();
  });

  this.Then(/^some "([^"]question)"$/, function (text, callback) {
    this.browser.text('body').should.match(new RegExp(text));
    callback();
  });
};
