// require mongoose
var mongoose = require('mongoose');

// create invite schema
var InviteSchema = mongoose.Schema({
	name: String,
	time: String,
	status: String,
	group: String,
	id: String,
	active: Boolean,
	urlname: String,
	updated: String,
	invitee: String
});

// create and export invite model
module.exports = mongoose.model('Invite', InviteSchema);
