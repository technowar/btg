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
    },

    user: {
      type: String,
      ref: 'User'
    }
  }));

  return questionSchema;
};
