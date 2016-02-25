'use strict';

module.exports = (Schema) => {
  const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      match: /.{, 6}/
    }
  });

  // TODO: add pre and post hooks

  return userSchema;
};
