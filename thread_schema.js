'use strict';

var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
  group: {
    type: String,
    trim: true,
    required: 'Thread must belong to a group.'
  },
  title: {
    type: String,
    trim: true,
    required: 'No title given (tried to create new thread)'
  },
  hostmessage: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Thread', ThreadSchema);
