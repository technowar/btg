'use strict';

const base = require('./base');
const mongoose = require('mongoose');

module.exports = () => {
  const userSchema = new mongoose.Schema(Object.assign({}, base, {
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

    likedQuestions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }],

    role: {
      type: String,
      default: 'user'
    }
  }));

  userSchema.statics.likedQuestions = (data, user) => {
    const User = mongoose.model('User');

    User.findOneAndUpdate({
      _id: user._id,
      deleted: false
    }, {
      $push: {
        likedQuestions: data._id
      }
    }, {
      new: true
    }, (error) => {
      if (error) {
        throw error;
      }
    });
  };

  return userSchema;
};
