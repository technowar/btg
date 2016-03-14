'use strict';
/**
 * Firstly, require every files inside the `schema` folder
 * and then load it as a new mongoose `Model`.
 *
 * Consider the following schema:
 *
 *   ./schema/user.js
 *   -----------------------
 *     module.export = (Schema) => {
 *       const userSchema = new Schema({
 *         email: String,
 *         password: String
 *       });
 *
 *       return userSchema;
 *     };
 *   -----------------------
 *
 * The above schema will be loaded as `User` model.
 * Take note of the file naming convention. As much
 * as possible, please use lowercase only file.
 *
 */
const path = require('path');

module.exports = (mongoose) => {
  const schemas = require('fs').readdirSync(path.join(__dirname, 'schema'));

  schemas.forEach((file) => {
    // Only include javascript files and exclude `base.js`
    if (file.match(/^base.js$/i) || !path.extname(file).match(/js/)) {
      return;
    }

    // Get the basename i.e `user`
    const baseName = file.split('.')[0];

    // Get the absolutepath for module require
    const filePath = path.join(`${__dirname}/schema/${baseName}`);
    const schema = require(filePath);

    // Capitalize first letter of the basename i.e `user` => `User`
    const modelName = baseName
      .charAt(0)
      .toUpperCase() + baseName.slice(1);

    // Create mongoose model
    mongoose.model(modelName, schema());
  });
};
