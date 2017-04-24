// set up passport local stratagy
var LocalStrategy = require('passport-local').Strategy;

// require user models
var User = require('../models/user');

// export callback function takes passport as argument
module.exports = function(passport) {

	// serializeUser
	passport.serializeUser(function(user, callback){
		console.log("serializeUser");
		callback(null, user.id);
	});

	// deserializeUser
	passport.deserializeUser(function(id, callback){
		console.log("deserializeUser");
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	// define local statagy
	passport.use('local-signup', new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     nameField: 'name',
     passReqToCallback : true
   },function(req, email, password, callback) {
  
		// Find a user with this e-mail
		User.findOne({ 'local.email' :  email }, function(err, user) {
		if (err) return callback(err);

		// If there already is a user with this email
		if (user) {
			return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
		} else {
			// There is no user registered with this email
			// Create a new user
			var newUser            = new User();
			newUser.local.email    = email;
			newUser.local.name = req.body.name;
			newUser.local.password = newUser.encrypt(password);

			newUser.save(function(err) {
			if (err) throw err;
				return callback(null, newUser);
			});
		}
		});
	}));

	passport.use('local-loggins', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
  	// Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
  }));
};