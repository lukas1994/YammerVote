'use strict';

var mongoose = require('mongoose');

var PollMessageSchema = new mongoose.Schema({
  poll: {
    type: mongoose.schema.ObjectId,
    ref: 'Poll'
    trim: true,
    required: 'Poll message must belong to a poll.'
  },
  answer: {
    type: String,
    trim: true,
    required: 'No answer given (tried to create new answer)'

  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('PollMessage', PollMessageSchema);
