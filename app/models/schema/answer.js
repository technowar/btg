'use strict';

const base = require('./base');
const mongoose = require('mongoose');

module.exports = () => {
  const answerSchema = new mongoose.Schema(Object.assign({}, base, {
    text: {
      type: String,
      required: true
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },

    user: {
      type: String,
      ref: 'User'
    }
  }));

  return answerSchema;
};
