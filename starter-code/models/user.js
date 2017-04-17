var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String,
  }
});

User.methods.encrypt = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

module.exports = mongoose.model('User', User);