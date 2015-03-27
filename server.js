'use strict';
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    express = require('./config/express'),
    config = require('./config/config');

//Connect to database
var db = mongoose.connect(config.db, function(err) {
    if(err) {
        console.error('Could not connect to MongoDB!');
        console.log(err);
    }
});

var app = express();

app.listen(config.port);

exports = module.export = app;

console.log('Server running at http://localhost:' + config.port);