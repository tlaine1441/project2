// require express
var express = require('express');

// define router
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');

// require passport
var passport = require("passport");

// require user controllers
var usersController = require('../controllers/users');

// require event controllers
var eventControllers = require('../controllers/eventController');


// authenticate user
function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) {
    console.log("Current user id: " + req.user._id);
    return next();
  }
  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

// index route
router.route('/') // index
  .get(usersController.getLogin)
  .post(usersController.postLogin)

// event by id
router.route('/events/:id')
  .get(authenticatedUser, eventControllers.eventIdGet)
  .post(authenticatedUser, eventControllers.eventIdPost);

// all events
router.route('/events') // index
  .get(authenticatedUser, eventControllers.eventGet)

// user events
router.route('/myevents')
  .get(authenticatedUser, eventControllers.myEventGet)

// invite squad rotue
router.route('/invite')
  .post(authenticatedUser, eventControllers.invEventPost)

// accpet invite
router.route('/acceptInvite')
  .post(authenticatedUser, eventControllers.acceptInvPost)

// deny invite
router.route('/denyInvite')
  .post(authenticatedUser, eventControllers.denyInvPost)

// signup route
router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

// login
router.route('/login')
  .get(authenticatedUser, usersController.getLogin)
  .post(usersController.postLogin)

// logout
router.route("/logout")
  .get(usersController.getLogout)

// export router
module.exports = router

