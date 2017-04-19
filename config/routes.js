var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var eventControllers = require('../controllers/eventController');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) {
    console.log("Current user id: " + req.user._id);
    return next();
  }
  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

// if(authenticatedUser) {
//   router.route('/')
//   .get(authenticatedUser, eventControllers.eventGet)
// } else{
//   router.route('/')
//   .get(staticsController.home)
// }

router.route('/')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/events')
  .get(authenticatedUser, eventControllers.eventGet)

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

router.route("/secret")
	.get(authenticatedUser, usersController.secret)

module.exports = router