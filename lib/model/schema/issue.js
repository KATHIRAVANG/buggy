'use strict';

var mongoose = require('mongoose'),
	helper = require('../../helper'),
	Schema = mongoose.Schema,
	IssueSchema = new Schema({
		id: {
			type: String,
			default: helper.id,
			validate: helper.isId
		},
		title: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		modified: {
			type: Date,
			default: new Date()
		}
	});

IssueSchema.index(
	{id: 1},
	{unique: true}
);

IssueSchema.statics.isValidId = helper.isId;

module.exports = IssueSchema;
