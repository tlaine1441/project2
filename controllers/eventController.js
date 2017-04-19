require('dotenv').config();
var request = require('request');
var db = require("../models");

var eventGet = function(req, res) {
	db.Event.find({}, function(err, events) {
	console.log(events);
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

module.exports.eventGet = eventGet;
module.exports.eventIdGet = eventIdGet;