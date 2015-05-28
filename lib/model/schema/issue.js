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

		// project: String,
		// private: {
		//	type: Boolean,
		//	default: false
		// },
		// priority: {
		//	type: String,
		//	enum: 'none low normal high'.split(' ')
		// },
		title: String,
		description: String,

		// activity: [require('./activity')],
		// assignee: Array,
		// labels: Array,
		// notes: [require('./note')],
		state: {
			type: String,
			enum: 'open closed'.split(' '),
			default: 'open'
		},

		// locked: {
		//	type: Boolean,
		//	default: false
		// },
		modified: {
			type: Date,
			default: Date.now
		},
		created: {
			type: Date,
			default: Date.now
		}
	});

IssueSchema.index(
	{id: 1},
	{unique: true}
);

IssueSchema.statics.isValidId = helper.isId;

module.exports = IssueSchema;
