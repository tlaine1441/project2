var passport = require("passport");

var db = require("../models");

// GET /signup
function getSignup(request, response, next) {
	console.log("in getSignup");
	response.render('signup.ejs', { message: request.flash('signupMessage')});
}

// POST /signup
  function postSignup(request, response, next) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect : '/events',
      failureRedirect : '/signup',
      failureFlash : true
    });

    return signupStrategy(request, response, next);
  }

// GET /login
function getLogin(request, response, next) { 
   if (request.isAuthenticated()) {
      return response.redirect('/events');
  }
  response.render('login.ejs', { message: request.flash('loginMessage')});
}

// POST /login 
function postLogin(request, response, next) {
	var loginStrategy = passport.authenticate('local-loggins', {
		successRedirect: '/events',
		failureRedirect: '/login',
		failureFlash: true
	});
	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response, next) {
  request.logout();
  response.redirect('/');
}




module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout
}