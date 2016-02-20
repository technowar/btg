module.exports = function () {
  this.Given(/^I visit "(\/question)" page$/, function (text, callback) {
    this.visit(text, callback);
  });
};
