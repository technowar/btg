module.exports = function () {
  this.Given(/^I visit "(\/register)" page$/, function (text, callback) {
    this.visit(text, callback);
  });
};
