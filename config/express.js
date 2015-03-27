'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    config = require('./config');

module.exports = function() {
    var app = express();
    require('../app/models/topic.server.model.js');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    require('../app/routes/birdie.server.routes.js')(app);

    return app;
};