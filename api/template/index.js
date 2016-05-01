'use strict';

const fs = require('fs'),
	status = require('hapi-status');

exports.register = (server, options, next) => {
	server.route({
		method: 'GET',
		path: '/api/v1/template/{view}',
		handler: (request, reply) => {
			let view = request.params.view;

			if (process.env.NODE_ENV === 'production') {
				view += '.min';
			}

			fs.access('./public/html/' + view + '.html', fs.F_OK, (error) => {
				if (!error) {
					return reply.view(view).header('Content-Type', 'text/html; charset=utf-8');
				}

				return status.notFound(reply);
			});
		}
	});

	next();
};

exports.register.attributes = {
	pkg: require('./package.json')
};
