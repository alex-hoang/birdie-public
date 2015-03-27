'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Topic = mongoose.model('Topic'),
    https = require('https'),
    oauth = require('oauth'),
    config = require('../../config/config.js'),
    twitter = require('../../config/twitter.js');

/**
 * Gets all trending topics
 */
exports.topics = function(req, res) {
    Topic.find().exec(function(err, topics) {
        if(err) {
            return res.status(400).send({
                message: 'Failed to get all trending topics'
            });
        } else {
            res.json(topics);
        }
    });
};

/**
 * Adds a trending topic to the server
 */
exports.create = function(req, res) {
    var topic = new Topic(req.body);

    topic.save(function(err) {
        if(err) {
            return res.status(400).send({
                message: 'Failed to create new topic'
            });
        } else {
            res.json(topic);
        }
    });
};

/**
 * Removes a trending topic from the server
 */
exports.delete = function(req, res) {
    var topic = req.topic;

    topic.remove(function(err) {
        if(err) {
            return res.status(400).send({
                message: 'Failed to delete a topic'
            });
        } else {
            res.json(topic);
        }
    });
};

/**
 * Loads trending topics from Twitter and updates the data store
 */
exports.load = function(req, res) {
    var oauth2 = new oauth.OAuth2(
        config.twitter.consumerKey,
        config.twitter.consumerSecret,
        'https://api.twitter.com/',
        null,
        'oauth2/token',
        null
    );

    oauth2.getOAuthAccessToken('', { 'grant_type': 'client_credentials'},
        function(e, access_token, refresh_token, results) {
            //console.log('bearer: ', access_token);

            twitter.get('/1.1/trends/place.json?id=1&exclude=hashtags', access_token,
                function(data){
                    // Bulk insert into mongoDB, mongoose create method actually loops
                    // through the array and adds them one by one
                    Topic.collection.insert(data[0].trends, function(err) {
                        if(err) {
                            return res.status(400).send({
                                message: 'Failed to insert top 10 trending topics'
                            });
                        } else {
                            res.send('Data store updated \n');
                        }
                    });
                }
            );
        }
    );
};

/**
 * Middleware that handles :topicName
 * Sets the topic to the request
 * Should refactor this so code isn't duplicated.
 */
exports.setTopic = function(req, res, next, str) {
    exports.topicByName(str, next, function(topic) {
        req.topic = topic;
        next();
    });
};

/**
 * Sets the topic to the request when the call passes an object containing the name
 * of the topic.
 * Should refactor this so code isn't duplicated.
 */
exports.setTopicPassedAsBody = function(req, res, next) {
    exports.topicByName(req.body.name, next, function(topic) {
        req.topic = topic;
        next();
    });
};

/**
 * Searches topics by topic name
 */
exports.topicByName = function(str, next, callback) {
    Topic.findOne({ name: str }).exec(function(err, topic) {
        if(err) {
            return next(err);
        }
        if(!topic) {
            return next(new Error('Topic ' + str + ' does not exist!'));
        }

        callback(topic);
    });
};

/**
 * Searches topics that starts with a supplied query string
 */
exports.topicsStartsWithString = function(req, res, next) {
    var str = req.query.query;
    if(!str) {
        next();
    } else {
        Topic.find({ name: new RegExp('^' + str) }).exec(function(err, topics) {
            if(err) {
                return next(err);
            }
            if(!topics) {
                return next(new Error('Failed to load topics that starts with ' + str));
            }

            res.json(topics);
        });
    }
};