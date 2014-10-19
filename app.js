'use strict';

var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yammervote2')
var uuid = require('uuid');
var request = require('request');

require('./poll_schema');

var Poll = mongoose.model('Poll');

var app = express();

app.use(express.static(__dirname + '/public'));

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

 app.get('/votes', function(req, res){
   poll = Poll.findOne({_id: req.query.id});
   (poll.votes1,
     poll.votes2);
 });

 app.get('/castvote', function(req, res){
   if (req.query.option1) {
   	console.log('in');
     Poll.update({"_id": req.query.id}, { $inc: {votes1: 1}}, {}, function(test) {
     	console.log(test);
     });
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

 app.get('/userpolls', function(req, res){
   Poll.find({user_id: req.query.user_id}, function(err, data){
     return res.jsonp(
       data
     );
   });
 });

 app.get('/redirect', function(req, res){
   var code = req.query.code;
   var url = "https://www.yammer.com/oauth2/access_token.json?client_id=duMqFN8SOor3eIF7to3sg&client_secret=L4CpyUXXaNQUtfssq3ucljsbpwtkwLjmsKYLk2DpKRA&code=" + code;
   request({
     url: url,
     json: true
   }, function (error, response, body) {
     if (error) {
       console.log(error);
       return;
     }
     console.log(body);
     console.log(typeof(body));
     var name = body.user.full_name;
     var network = body.user.network_name;
     res.redirect("/?name="+name+"&network="+network);
   });
 });

 app.get('/getpoll', function(req, res){
   if (!('group' in req.query)) {
     req.query.group = '';
   }
   Poll.findOneRandom(function(err, poll){
     if (err) {
   		console.log(err);
   	  }
      return res.jsonp(poll);
   });


 });

 app.get('/postpoll', function(req, res){
   var group = req.query.group;
   var question = req.query.question;
   var answer1 = req.query.option1;
   var answer2 = req.query.option2;
   var user_id = req.query.user
   var poll = new Poll();
   poll.group = group;
   poll.question = question;
   poll.option1 = answer1;
   poll.option2 = answer2;
   poll.user_id = user_id;
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
