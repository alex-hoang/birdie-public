'use strict';

module.exports = function(app) {
    var birdie = require('../controllers/birdie.server.controller.js');

    app.route('/birdie/rest/topics')
        .get(birdie.topicsStartsWithString, birdie.topics);

    app.route('/birdie/rest/topics/load')
        .post(birdie.load);

    app.route('/birdie/rest/topic')
        .post(birdie.create)
        .delete(birdie.setTopicPassedAsBody, birdie.delete);

    app.route('/birdie/rest/topic/:topicName')
        .delete(birdie.delete);

    app.param('topicName', birdie.setTopic)
};