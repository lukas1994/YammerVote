'use strict';

var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yammervote')
var uuid = require('uuid');

require('./poll_schema');

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

 app.get('/votes')

 app.get('/castvote', function(req, res){
   poll_id = req.query.id
   if (req.query.option1) {
     Poll.update({"_id": req.query.id}, { $inc: {votes1: 1}});
   } else {
     Poll.update({"_id": req.query.id}, { $inc: {votes2: 1}});
   }
 });

 /*app.get('/getpoll', function(req, res){
   Poll.count(function(err, count){
     Poll.findOne({skip: count*Math.random()}, function(err, poll){
       res.jsonp(poll);
     });
   });
 }); */

 app.get('/getpoll', function(req, res){
   Poll.count({$or: [{group: res.query.group}, {group: ""}]}, function(err, count){
     Poll.findOne({$or: [{group: res.query.group}, {group: ""}]}, {skip: count*Math.random()}, function(err, poll){
     });
   })
 });

 app.get('/postpoll', function(req, res){
   var group = req.query.group;
   var question = req.query.question;
   var answer1 = req.query.option1;
   var answer2 = req.query.option2;
   var poll = new Poll();
   poll.group = group;
   poll.question = question;
   poll.option1 = answer1;
   poll.option2 = answer2;
   poll.save(function(err){
     if (err) {
       return res.send(400, err);
     } else {
       return res.jsonp({
            message: 'successful'
          });
     }
   });
 });

 app.listen(3333);
