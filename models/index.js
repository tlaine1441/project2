// require mongoose
var mongoose = require("mongoose");

// set connections to mongolab and localhost as backup
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/gathr");

// require require and export user and event models
module.exports.User = require('./user.js');
module.exports.Event = require('./events.js');
