'use strict';

var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
  group: {
    type: String,
    trim: true,
    required: 'Poll must belong to a group.'
  },
  question: {
    type: String,
    trim: true,
    required: 'No message text given (tried to create new message)'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Poll', PollSchema);
