require('dotenv').config();
var request = require('request');
var db = require("../models");

var eventGet = function(req, res) {
	db.Event.find({}, function(err, events) {
		db.User.findOne({_id: req.user._id}, function(err, user) {
			//console.log(user.events);
			res.render('index', {events: events, userEvents: user.events});
		});
	});
}

var myEventGet = function(req, res) {
	db.Event.find({}, function(err, events) {
		db.User.findOne({_id: req.user._id}, function(err, user) {
			//console.log(user.events);
			res.render('myEvents', {events: events, userEvents: user.events});
		});
	});
}

var eventIdGet = function(req, res) {
	//console.log(req.params.id);
	db.Event.findOne({id: req.params.id}, function(err, event) {
	//console.log(events);
	if (!event) {
		res.json({"message": "Not found"});
	}
	res.json(event);
	});
}

var eventIdPost = function(req, res) {
	db.User.findOne({_id: req.user._id}, function(err, user) {
		//console.log("user: " + user);
		db.Event.findOne({id: req.params.id}, function(err, event){
			//console.log("event found: " + event.time);
			var eventObj = {
				name: event.name,
				time: event.time,
				status: event.status,
				group: event.group,
				id: event.id,
				urlname: event.urlname,
				active: false
			}
			var found = false;
			user.events.forEach(function(event){
				if(event.id === eventObj.id){
					console.log("found");
					found = true;
				} else {

				}
			});
			if(!found){
				user.events.push(eventObj);
				console.log("added");
				user.save(function (err) {
				  if(err) {console.error('ERROR!' + err);}
				});
			}
			
		});
	});
}

module.exports.eventGet = eventGet;
module.exports.eventIdGet = eventIdGet;
module.exports.eventIdPost = eventIdPost;
module.exports.myEventGet = myEventGet;
