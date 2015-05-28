'use strict';

var cache = {};

function Model(dsn) {
	var model = this,
		mongoose = require('mongoose'),
		connected = false,
		connection = false,
		list = {};

	function init() {
		connection = mongoose.createConnection(dsn);

		//  watch for connection events maintaining the proper connection state
		connection
			.on('connected', function() {
				// console.info('Mongoose connected to %s', dsn);
				connected = true;
			})
			.on('disconnected', function() {
				connected = false;
			})

			//  if there is an error connecting, log it onto the console
			.on('error', function(error) {
				console.error('Mongoose connection error (%s) for "%s", shutting down application', error, dsn);
				process.exit(0);
			});

		//  listen for application close signals and try to close any open connections
		process.on('SIGINT', function() {
			if (connected) {
				connection.close(function() {
					console.error('Closed mongoose connection to "%s" through app termination', dsn);
					process.exit(0);
				});
			}
		});
	}

	function ucFirst(name) {
		return name[0].toUpperCase() + name.substr(1);
	}

	function fieldMethod(property, one) {
		return function(value, callback) {
			var search = {};

			search[property] = value;
			return this['find' + (one ? 'One' : '')](search, callback);
		};
	}

	function addFieldMethods(schema) {
		for (var p in schema.paths) {
			switch (schema.paths[p].options.type) {
				case String:
				case Number:
				case Boolean:
					schema.statics['findOneBy' + ucFirst(p)] = fieldMethod(p, true);
					schema.statics['findBy' + ucFirst(p)] = fieldMethod(p, false);
					break;
			}
		}
	}

	model.load = function(name) {
		var schema;

		if (!(name in list)) {
			schema = require('./schema/' + name.toLowerCase());
			addFieldMethods(schema);
			schema.pre('save', function(next) {
				if (this.modified) {
					this.modified = new Date();
				}

				next();
			});

			list[name] = connection.model(ucFirst(name), schema);
		}

		return list[name];
	};

	init();
}

module.exports = function(dsn) {
	if (!(dsn in cache)) {
		cache[dsn] = new Model(dsn);
	}

	return cache[dsn];
};
