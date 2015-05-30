'use strict';

exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: 'list'
		}
	});

	server.route({
		method: 'GET',
		path: '/static/{filename}.{extension}',
		handler: require('./static')
	});

	next();
};

exports.register.attributes = {
	pkg: require('./package.json')
};
