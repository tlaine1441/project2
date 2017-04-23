require('dotenv').config();
var request = require('request');
var db = require("../models");

var eventGet = function(req, res) {
	db.Event.find({}, function(err, events) {
		db.User.findOne({_id: req.user._id}, function(err, user) {
			//console.log(user.events);
			res.render('index', {events: events, userEvents: user.events, invites: user.invites});
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

var myEventGet = function(req, res) {
	db.Event.find({}, function(err, events) {
		db.User.findOne({_id: req.user._id}, function(err, user) {
			//console.log(user.events);
			res.render('myEvents', {events: events, userEvents: user.events, invites: user.invites});
		});
	});
}

var invEventPost = function(req, res) {
	var id = req.body.id;
	db.Event.findOne({id:id}, function(err, event) {
		if(err){console.log(err);}
		var eventObj = {
			name: event.name,
			time: event.time,
			status: event.status,
			group: event.group,
			id: event.id,
			urlname: event.urlname,
			active: false
		}
		db.User.findOne({_id: req.user._id}, function(err, user) {
			user.squad.forEach(function(squadMemberId){
				db.User.findOne({_id: squadMemberId}, function(err, foundUser){
					var found = false;
					foundUser.invites.forEach(function(invite){
						if(invite.id === id){
							console.log("event exists");
							found = true;
						}
					});
					if(!found){
						console.log("will be added");
						foundUser.invites.push(eventObj);
						console.log("added");
						foundUser.save(function (err) {
						if(err) {console.error('ERROR!' + err);}
						});
					} else {
						console.log("wont be added");
					}
				});
			});
		});
	});
}

var acceptInvPost = function(req, res){
	var id = req.body.id;
	db.User.findOne({_id: req.user._id}, function(err, user) {
		db.Event.findOne({id: id}, function(err, event){
			//console.log("event found: " + event);
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

			user.invites.forEach(function(invite, index){
				if(id === invite.id){
					console.log(invite.name);
					console.log("found event at: " + index);
					user.invites.splice(index, 1);
					console.log(user.invites);
					user.save(function (err) {
						if(err) {console.error('ERROR!' + err);}
						console.log("removed?");
					});
				}
			});
			
		});
	});

}

var denyInvPost = function(req, res){
	//console.log("deny" + req.body.id);
	var id = req.body.id;
	db.User.findOne({_id: req.user._id}, function(err, user) {
		//console.log(user.invites);
			user.invites.forEach(function(invite, index){
				if(id === invite.id){
					console.log(invite.name);
					console.log("found event at: " + index);
					user.invites.splice(index, 1);
					console.log(user.invites);
					user.save(function (err) {
						if(err) {console.error('ERROR!' + err);}
						console.log("removed?");
					});
				}
			});
	});
}


module.exports.eventGet = eventGet;
module.exports.eventIdGet = eventIdGet;
module.exports.eventIdPost = eventIdPost;
module.exports.myEventGet = myEventGet;
module.exports.invEventPost = invEventPost;
module.exports.acceptInvPost = acceptInvPost;
module.exports.denyInvPost = denyInvPost;
