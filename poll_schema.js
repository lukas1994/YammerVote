'use strict';

var mongoose = require('mongoose'),
random = require('mongoose-simple-random');

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
  option1: {
    type: String,
    trim: true,
    required: 'Need two answers.'
  },
  option2: {
    type: String,
    trim: true,
    required: 'Need two answers.'
  },
  votes1: {
    type: Number,
    default: 0
  },
  voted2: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
});

PollSchema.plugin(random);

mongoose.model('Poll', PollSchema);
