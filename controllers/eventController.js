require('dotenv').config();
var request = require('request');
var db = require("../models");

var eventGet = function(req, res) {
	db.Event.find({}, function(err, events) {
	console.log(events);
	res.render('index', {events: events});
	});
}

module.exports.eventGet = eventGet;