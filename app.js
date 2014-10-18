'use strict';

var express = require('express');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/local_chat_backend')
var uuid = require('uuid');

require('./thread_schema');
require('./message_schema');
require('./poll_schema');

var Thread = mongoose.model('Thread');
var Message = mongoose.model('Message');
var Poll = mongoose.model('Poll');

var app = express();

var Yammer = new require('yammer').Yammer;

var yam = new Yammer({ access_token: "M0OrJhe9QWxYMCkATSkvNA"});
// DEBUG:
//app.configure(function() {
//  app.use(express.static(__dirname));
//});

// req.query: url params
// req.params: route params
// curl -X POST "http://localhost:3333/login?email=lukas@test.de&password=12345678"

/*
 * params: email, password
 * return: nothing
 */

/*
 * params: email, password, stay_logged_in
 * return: session_id
 */

 //https://www.yammer.com/dialog/oauth?client_id=duMqFN8SOor3eIF7to3sg&redirect_uri=https://www.yammer.com
 //uN7DsSwpaPtdWjmiCjfh3Q
 app.get('/test', function(req, res){
   yam.messagesReceived(function(res, body) {
  console.log(body.messages)});
 });

 app.listen(3333);
