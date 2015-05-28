'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	author: String,
	content: String,
	date: {
		type: Date,
		default: Date.now
	}
});
