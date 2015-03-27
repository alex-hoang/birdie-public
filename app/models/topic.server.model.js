'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Trend Schema - Based on https://dev.twitter.com/rest/reference/get/trends/place
 */
var TopicSchema = new Schema({
    events: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: '',
        required: 'Please fill name',
        trim: true
    },
    promoted_content: {
        type: String,
        default: null
    },
    query: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }
});

mongoose.model('Topic', TopicSchema);
