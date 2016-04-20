'use strict';

var Glue = require('glue'),
	Hoek = require('hoek'),
	Config = require('./lib/config'),
	manifest = Config.get('manifest'),
	helper = require('./helper/handlebars.js'),
	server;

Glue.compose(manifest, {relativeTo: __dirname}, function(error, svr) {
	if (error) {
		throw new Error(error);
	}

	server = svr;

	server.register(require('inert'), function(err) {
		Hoek.assert(!err, err);
	});

	server.register(require('vision'), function(err) {
		Hoek.assert(!err, err);

		server.views({
			engines: {
				html: require('handlebars')
			},
			path: __dirname + '/public/html',
			partialsPath: __dirname + '/public/html/partials'
		});
	});

	if (!module.parent) {
		server.start(function(error) {
			console.log(' - server started at port ' + server.info.port);
		});
	}
});

module.exports = server;
