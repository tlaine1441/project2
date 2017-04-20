var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var request = require('request');

var db = require('./models');


app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var routes = require('./config/routes');
app.use(routes);

setInterval(function(){
request("https://api.meetup.com/recommended/events?key=" + process.env.API_KEY + "&topic_category=tech&radius=5", function (error, response, body) {
// 	console.log('error:', error); 
	// console.log('statusCode:', response && response.statusCode); 
//console.log('body:', body); 
	//console.log(apiCall()); 
	var body = JSON.parse(body);
	//res.json(body);
	body.forEach(function(event){
		var date = new Date(event.time);
		var updateTime = new Date(event.updated);
		var eventObj = {
			name: event.name,
			time: date,
			status: event.status,
			group: event.group.name,
			id: event.id,
			urlname: event.group.urlname,
			active: false,
			updated: updateTime
		}
		if (event.venue != null){
			eventObj.city = event.venue.city;
		} else {
			eventObj.city = "N/A";
		}	
	  	db.Event.findOne({id: eventObj.id}, function(err, dbEvent) {
	  		if(dbEvent) {
				console.log("found");
	  		} else {
	  			db.Event.create(eventObj, function(err, event){
			    if (err) { return console.log('ERROR', err); }
			 	console.log("sucess: " + event);
			  });
	  		}
	  	});
	});
});
}, 3600000); 

app.listen(3000);