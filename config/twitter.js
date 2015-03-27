'use strict';

/**
 * Module dependencies.
 */
var https = require('https');

exports.get = function(apiPath, access_token, callback) {
    var options = {
        host: 'api.twitter.com',
        path: apiPath,
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    };

    var buffer = '';
    var req = https.get(options, function(result) {
        result.setEncoding('utf8');

        //Data comes in chunks so append to buffer
        result.on('data', function(chunk) {
            buffer += chunk;
        });

        result.on('end', function() {
            var trends = JSON.parse(buffer);
            callback(trends);
        });
    });

    req.on('error', function(e) {
        console.log('Error occured in twitter.get(): ' + e.message);
    });

    req.end();
};