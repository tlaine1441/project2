var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

	passport.serializeUser(function(user, callback){
		console.log("serializeUser");
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback){
		console.log("deserializeUser");
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		userNameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback){
		console.log("passporthit");
		User.findOne({"local.email": email}, function(err, user){
			if(err) return callback(err);

			if(user) {
				return callback(null, false, req.flash('signupMessage', 'This email is already in use'));
			} else {
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);

				newUser.save(function(err){
					if(err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));
};