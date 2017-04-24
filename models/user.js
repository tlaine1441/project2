// require mongoose
var mongoose = require('mongoose');

// require bcrypt for password
var bcrypt   = require('bcrypt-nodejs');

// require event model
var Event = require('./events.js');

// require invite model
var Invite = require('./invites.js');

// create user schema
var User = mongoose.Schema({
  local : {
  	name: String,
    email        : String,
    password     : String,
  },
  squad: [String],
  events: [Event.schema],
  invites: [Invite.schema]
});

// create user method to salt and hash password
User.methods.encrypt = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// create user method to compare current password with salted hash attempt
User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}

// create and export user model
module.exports = mongoose.model('User', User);