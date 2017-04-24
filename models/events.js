
// require mongoose
var mongoose = require('mongoose');

// create event schema 
var EventSchema = mongoose.Schema({
	name: String,
	time: String,
	city: String,
	status: String,
	group: String,
	id: String,
	active: Boolean,
	urlname: String,
	updated: String
});

// create model and export event model
module.exports = mongoose.model('Event', EventSchema);
