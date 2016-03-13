'use strict';

module.exports = (Schema) => {
  const userSchema = new Schema({
    _id: {
      type: String,
      unique: true,
      index: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      default: ''
    },

    picture: {
      type: String,
      default: ''
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
  });

  // TODO: add pre and post hooks

  return userSchema;
};
