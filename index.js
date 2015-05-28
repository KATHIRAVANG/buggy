'use strict';

var Glue = require('glue'),
	fs = require('fs'),
	Config = require('./lib/config'),
	manifest = Config.get('manifest'),
	dir = __dirname + '/api',
	server;

fs.readdirSync(dir)
	.filter(function(item) {
		return fs.statSync(dir + '/' + item).isDirectory();
	})
	.forEach(function(item) {
		manifest.plugins[dir + '/' + item] = null;
	});

Glue.compose(manifest, function(error, svr) {
	if (error) {
		throw new Error(error);
	}

	server = svr;

	if (!module.parent) {
		server.start(function(error) {
			console.log(' - server started at port ' + server.info.port);
		});
	}
});

module.exports = server;
