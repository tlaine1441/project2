// require dotevn for api key storage
require('dotenv').config();

// require request
var request = require('request');

// require models
var db = require("../models");

// eventGet controller
var eventGet = function(req, res) {

	// find all events in db
	db.Event.find({}, function(err, events) {

		// find logged-in user in db
		db.User.findOne({_id: req.user._id}, function(err, user) {
			// respond render to index and pass events, usersevents and invites to be accessable in ejs
			res.render('index', {events: events, userEvents: user.events, invites: user.invites});
		});
	});
} // end eventGet


// eventIdGet   get event by id
var eventIdGet = function(req, res) {

	// find logged-in user in db
	db.Event.findOne({id: req.params.id}, function(err, event) {

		// if there is no event sent json message
		if (!event) {
			res.json({"message": "Not found"});
		}

		// if there is an event send json response
		res.json(event);
	});
} // end eventIdGet


// eventIdPost post a single event into user event array
var eventIdPost = function(req, res) {

	// find logged-in user in db
	db.User.findOne({_id: req.user._id}, function(err, user) {

		// find event in db by meetup event id
		db.Event.findOne({id: req.params.id}, function(err, event){

			// create generic object to store neccesary values
			var eventObj = {
				name: event.name,
				time: event.time,
				updated: event.updated,
				status: event.status,
				group: event.group,
				id: event.id,
				urlname: event.urlname,
				active: false
			}

			// test if event exists in user events array
			var found = false;
			user.events.forEach(function(event){
				if(event.id === eventObj.id){
					console.log("found");
					found = true;
				} 
			});

			// if event is not found push event into user event array
			if(!found){
				user.events.push(eventObj);
				console.log("added");

				// save user
				user.save(function (err) {
				  if(err) {console.error('ERROR!' + err);}
				});
			}
			
		});
	});
} // end eventIdPost

// get events in logged-in users event array
var myEventGet = function(req, res) {

	// get all events
	db.Event.find({}, function(err, events) {

		// get user by logged-in id
		db.User.findOne({_id: req.user._id}, function(err, user) {

			// render myEvents page with events user events and invites
			res.render('myEvents', {events: events, userEvents: user.events, invites: user.invites});
		});
	});
} // end myEventGet

// invEventPost puts event into each user in sqauds invites array
var invEventPost = function(req, res) {

	// get id passed in body
	var id = req.body.id;

	// find the event by passed in id  note: its the meetup event id not db id
	db.Event.findOne({id:id}, function(err, event) {
		
		// error handle
		if(err){console.log(err);}

		// find loged in user in db
		db.User.findOne({_id: req.user._id}, function(err, user) {

			// create generic object with necessay info
			var eventObj = {
				name: event.name,
				updated: event.updated,
				time: event.time,
				status: event.status,
				group: event.group,
				id: event.id,
				urlname: event.urlname,
				active: false,
				invitee: user.local.name
			}

			// loop through all user ids in squad array
			user.squad.forEach(function(squadMemberId){

				// find each squad memeber document in db by id
				db.User.findOne({_id: squadMemberId}, function(err, foundUser){

					var found = false;

					// check to see if user already has been invited
					foundUser.invites.forEach(function(invite){
						if(invite.id === id){
							console.log("event exists");
							found = true;
						}
					});

					// if event is not found in users invite array add event
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

// acceptInvPost takes event from invite array and moves it to users events array
var acceptInvPost = function(req, res){
	var id = req.body.id;

	// find logged-in user in db
	db.User.findOne({_id: req.user._id}, function(err, user) {

		// find event by meetup id
		db.Event.findOne({id: id}, function(err, event){

			// create generic object
			var eventObj = {
				name: event.name,
				time: event.time,
				updated: event.updated,
				status: event.status,
				group: event.group,
				id: event.id,
				urlname: event.urlname,
				active: false
			}


			var found = false;

			// loop through user events array
			user.events.forEach(function(event){
				if(event.id === eventObj.id){
					console.log("found");
					found = true;
				}
			});

			// if event is not found push event into user events
			if(!found){
				user.events.push(eventObj);
				console.log("added");
				user.save(function (err) {
				  if(err) {console.error('ERROR!' + err);}
				});
			}	

			// remove event pushed into event array from invite array
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
} // end acceptInvPost

// denyInvPost removes event from users invite array
var denyInvPost = function(req, res){

	var id = req.body.id;

	// find logged-in user by id
	db.User.findOne({_id: req.user._id}, function(err, user) {

		// loop through user invites array
		user.invites.forEach(function(invite, index){

			// remove event
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
} // end denyInvPost


// export controllers
module.exports.eventGet = eventGet;
module.exports.eventIdGet = eventIdGet;
module.exports.eventIdPost = eventIdPost;
module.exports.myEventGet = myEventGet;
module.exports.invEventPost = invEventPost;
module.exports.acceptInvPost = acceptInvPost;
module.exports.denyInvPost = denyInvPost;
