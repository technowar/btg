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

  questionSchema.statics.likes = (data, user) => {
    const Question = mongoose.model('Question');

    Question.findOneAndUpdate({
      _id: data._id,
      deleted: false
    }, {
      $push: {
        likes: user._id
      }
    }, {
      new: true
    }, (error) => {
      if (error) {
        throw error;
      }
    });
  };

  return questionSchema;
};
