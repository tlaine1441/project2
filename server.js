// Necessary packages
var express = require('express');
var app  = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cron = require('node-cron');
var request = require('request');

// reqiures all models
var db = require('./models');

// use morgan logger
app.use(morgan('dev')); 
// use cookie parser
app.use(cookieParser());
// use cookie parser
app.use(bodyParser()); 

// Set ejs view engine
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// serve public front end files from public
app.use(express.static(__dirname + '/public'));

// passport use's
app.use(session({ secret: 'GATHR' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

// set current user to res.locals
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// require routes from routes config
var routes = require('./config/routes');
app.use(routes);

// uodate database from meetup api every hour
cron.schedule('*/30 * * * *', function(){

	// request data from api
	request("https://api.meetup.com/recommended/events?key=" + process.env.API_KEY + "&topic_category=tech&radius=5", function (error, response, body) {
		var body = JSON.parse(body);

		//loop through reponse body to get each event
		body.forEach(function(event){

			// parse time from unix
			var date = new Date(event.time); 
			var updateTime = new Date(event.updated);
			var options = {  
			    weekday: "long", year: "numeric", month: "short",  
			    day: "numeric", hour: "2-digit", minute: "2-digit"  
			}; 
			var formatedDate = (date.toLocaleTimeString("en-us", options));
			var formatedUpdate = (updateTime.toLocaleTimeString("en-us", options));


			// create smaller object with necessary data
			var eventObj = {
				name: event.name,
				time: formatedDate,
				city: event.city,
				status: event.status,
				group: event.group.name,
				id: event.id,
				urlname: event.group.urlname,
				active: false,
				updated: formatedUpdate
			}

			// test if venue is null and set na if true. 
			if (event.venue != null){
				eventObj.city = event.venue.city;
			} else {
				eventObj.city = "N/A";
			}	

			// validate and add if the event is not already databased
		  	db.Event.findOne({id: eventObj.id}, function(err, dbEvent) {
		  		if(dbEvent) {
					console.log("found");
					// var dbUtc = dbEvent.time.slice(0,10).replace(/-/g,'/');;
					// console.log(dbUtc);
		  		} else {
		  			db.Event.create(eventObj, function(err, event){
				    if (err) { return console.log('ERROR', err); }
				 	console.log("sucess: " + event);
				  });
		  		}
		  	});
		});
	});
}); 

// set port
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});


