var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/gathr'); 

module.exports.User = require('./user.js');
module.exports.Event = require('./events.js');
