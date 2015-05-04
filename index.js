'use strict';

var Glue = require('glue'),
	manifest = {
		"server": {
			"app": {
				"slogan": "Issue Tracking"
			}
		},
		"connections": [{
			"port": 8000,
		}],
		"plugins": {}
	},
	server;

Glue.compose(manifest, function(error, svr) {
	if (error) throw new Error(error);

	server = svr;

	if (!module.parent) {
		server.start(function(error) {
			console.log(' - server started at port ' + server.info.port);
		});
	}
});

module.exports = server;
