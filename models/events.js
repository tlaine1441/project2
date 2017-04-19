var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var EventSchema = mongoose.Schema({
	name: String,
	time: String,
	status: String,
	group: String,
	id: String,
	active: Boolean,
	urlname: String
});

module.exports = mongoose.model('Event', EventSchema);
