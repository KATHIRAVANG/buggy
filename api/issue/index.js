'use strict';

var api = require('./api'),
	base = '/api/v1/issue',
	Joi = require('joi');

exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path: base,
		handler: api.list
	});

	server.route({
		method: 'POST',
		path: base,
		handler: api.create
	});

	server.route({
		method: 'GET',
		path: base + '/{id}',
		handler: api.fetch
	});

	server.route({
		method: 'PUT',
		path: base + '/{id}',
		handler: api.upsert
	});

	server.route({
		method: 'DELETE',
		path: base + '/{id}',
		handler: api.remove
	});

	next();
};

exports.register.attributes = {
	pkg: require('./package.json')
};
