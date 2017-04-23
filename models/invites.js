var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

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

module.exports = mongoose.model('Invite', InviteSchema);
