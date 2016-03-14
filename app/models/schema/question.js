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

  return questionSchema;
};
