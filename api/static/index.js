'use strict';

var Path = require('path');

exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path: '/static/{path*}',
		handler: function(request, reply) {
			var file = request.params.path.split('.');

			return reply.file(Path.join(__dirname, '../..', 'client/src/', file[1], request.params.path));
		}
	});

	next();
};

exports.register.attributes = require('./package.json');
