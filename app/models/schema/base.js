'use strict';

/**
 * Base Schema
 *
 * Every Schema should extend this one
 */

module.exports = {
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  // For soft delete
  deleted: {
    type: Boolean,
    default: false
  }
};
