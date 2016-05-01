'use strict';

const api = require('./api'),
	base = '/api/v1/issue',
	Joi = require('joi');

exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path: base,
		handler: api.list,
		config: {
			validate: {
				query: {}
			}
		}
	});

	server.route({
		method: 'POST',
		path: base,
		handler: api.create,
		config: {
			validate: {
				payload: {
					title: Joi.string().min(3).required(),
					description: Joi.string().min(10).required(),
					state: Joi.string().valid('open', 'closed')
				},
				query: {}
			}
		}
	});

	server.route({
		method: 'GET',
		path: base + '/{id}',
		handler: api.fetch,
		config: {
			validate: {
				params: {
					id: Joi.string().alphanum().length(11)
				}
			}
		}
	});

	server.route({
		method: 'PUT',
		path: base + '/{id}',
		handler: api.upsert,
		config: {
			validate: {
				params: {
					id: Joi.string().alphanum().length(11)
				},
				payload: {
					title: Joi.string().min(3),
					description: Joi.string().min(10),
					state: Joi.string().valid('open', 'closed')
				},
				query: {}
			}
		}
	});

	server.route({
		method: 'DELETE',
		path: base + '/{id}',
		handler: api.remove,
		config: {
			validate: {
				params: {
					id: Joi.string().alphanum().length(11)
				},
				payload: {},
				query: {}
			}
		}
	});

	next();
};

exports.register.attributes = {
	pkg: require('./package.json')
};
