'use strict';

module.exports = (Schema) => {
  const questionSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  return questionSchema;
};
