'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	date: Date,
	type: {
		type: String,
		enum: 'create update closed'
	},
	remark: String,
	// user: String
});
