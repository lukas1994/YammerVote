'use strict';

var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  thread: {
    type: mongoose.Schema.ObjectId,
    ref: 'Thread',
    required: 'No thread reference given (tried to create new message)'
  },
  message: {
    type: String,
    trim: true,
    required: 'No message text given (tried to create new message)'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Message', MessageSchema);
