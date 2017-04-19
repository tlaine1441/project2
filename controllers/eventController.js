require('dotenv').config();
var request = require('request');
var db = require("../models");

var eventGet = function(req, res) {
	db.Event.find({}, function(err, events) {
	//console.log(events);
	res.render('index', {events: events});
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
		console.log("user: " + user);
		db.Event.findOne({id: req.params.id}, function(err, event){
			console.log("event found: " + event.time);
			var eventObj = {
				name: event.name,
				time: event.time,
				status: event.status,
				group: event.group,
				id: event.id,
				urlname: event.urlname,
				active: false
			}

			user.events.push(eventObj);
			user.save(function (err) {
			  if(err) {console.error('ERROR!' + err);}
			});
		});
	});
}

module.exports.eventGet = eventGet;
module.exports.eventIdGet = eventIdGet;
module.exports.eventIdPost = eventIdPost;