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

    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }],

    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }],

    role: {
      type: String,
      default: 'user'
    }
  }));

  return userSchema;
};
