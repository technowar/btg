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

  userSchema.statics.likedQuestions = (questionId, userId, callback) => {
    const User = mongoose.model('User');

    User.findOne({
      _id: userId,
      deleted: false
    }, (error, data) => {
      if (error) {
        callback(error, null);
      }

      let like = {
        $push: {
          likedQuestions: questionId
        }
      };

      if (!data.likedQuestions.indexOf(questionId)) {
        like = {
          $pull: {
            likedQuestions: questionId
          }
        };
      }

      User.findOneAndUpdate({
        _id: userId,
        deleted: false
      }, like, {
        new: true
      }, (err, doc) => {
        if (err) {
          callback(err, null);
        }

        callback(null, doc);
      });
    });
  };

  return userSchema;
};
