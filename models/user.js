var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Event = require('./events.js');

var User = mongoose.Schema({
  local : {
  	name: String,
    email        : String,
    password     : String,
  },
  squad: [String],
  events: [Event.schema],
  invites: [Event.schema]
});

User.methods.encrypt = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', User);