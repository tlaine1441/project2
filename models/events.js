var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Event = mongoose.Schema({
	name: String,
	time: String,
	status: String,
	group: String,
	id: String,
	active: Boolean
});

module.exports = mongoose.model('Event', Event);
