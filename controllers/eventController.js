require('dotenv').config();
var request = require('request');
//var db = require('./models');

// var apiCall = function() {
// 	var output;
// 	request("https://api.meetup.com/recommended/events?key=" + process.env.API_KEY + "&topic_category=tech&page=1000", function (error, response, body) {
// 	  // 	console.log('error:', error); 
// 	 	// console.log('statusCode:', response && response.statusCode); 
// 	  // 	console.log('body:', body);
// 	  	console.log("insde api call " + body);
// 	  	output = JSON.parse(body);
// 	});
// 	return output;
// }


	var eventGet = function(req, res) {
	var output = [];
	var baseId= 0;
	https://api.meetup.com/recommended/events?&sign=true&photo-host=public&page=20&topic_category=tech
	request("https://api.meetup.com/recommended/events?key=" + process.env.API_KEY + "&topic_category=tech&radius=5", function (error, response, body) {
	  // 	console.log('error:', error); 
	 	// console.log('statusCode:', response && response.statusCode); 
	  //console.log('body:', body); 
	  	//console.log(apiCall()); 
	  	var body = JSON.parse(body);
	  	//res.json(body);
	  	body.forEach(function(event){
	  		var date = new Date(event.time);
	 		var eventObj = {
	  			name: event.name,
	  			time: date,
	  			status: event.status,
	  			group: event.group.name,
	  			id: event.id,
	  			urlname: event.group.urlname,
	  			active: false
	  		}
	  		if (event.venue != null){
	  			eventObj.city = event.venue.city;
	  		} else {
	  			eventObj.city = "N/A";
	  		}
	  		output.push(eventObj);
	  		console.log(date);
	  	});
	  	//res.json(output);
	  	//console.log(output.length);
	  	res.render('index', {events: output});
	});
}

module.exports.eventGet = eventGet;