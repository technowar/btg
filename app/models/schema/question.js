'use strict';

const base = require('./base');
const mongoose = require('mongoose');

module.exports = () => {
  const questionSchema = new mongoose.Schema(Object.assign({}, base, {
    text: {
      type: String,
      required: true
    },

    answer: {
      type: String,
      default: ''
    },

    likes: [{
      type: String,
      ref: 'User'
    }],

    user: {
      type: Object,
      default: {
        name: 'Anonymous',
        picture: '/images/anonymous.png'
      }
    }
  }));

  questionSchema.statics.likes = (questionId, userId, callback) => {
    const Question = mongoose.model('Question');

    Question.findOne({
      _id: questionId,
      deleted: false
    }, (error, data) => {
      if (error) {
        callback(error, null);
      }

      let like = {
        $push: {
          likes: userId
        }
      };

      if (!data.likes.indexOf(userId)) {
        like = {
          $pull: {
            likes: userId
          }
        };
      }

      Question.findOneAndUpdate({
        _id: data,
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

  return questionSchema;
};
