/* jshint browser:true,newcap:false */
/* global kx:true */

(function(window, kx) {
	'use strict';

	function API() {
		var api = this,
			version = 'v1',
			base = '/api/' + version,
			cache = {};

		function fetch(config, callback) {
			var complete = 'complete' in config ? config.complete : null,
				ready = function(status, message, request) {
					if (complete) {
						complete.apply(this, arguments);
					}

					if (typeof callback === 'function') {
						callback.apply(api, [JSON.parse(request.responseText), +status, message]);
					}
				};

			setTimeout(function() {
				config.complete = ready;

				kx.ajax.request(config);
			}, 0);
		}

		function method(type) {
			return function(config, callback) {
				var options, key;

				if (typeof config === 'string') {
					config = {url: config};
				}

				if ('data' in config && typeof config.data !== 'undefined') {
					Object.keys(config.data).forEach(function(key) {
						if (config.data[key] instanceof Array && !config.data[key].length) {
							config.data[key] = '[]';
						}
					});
				}

				if ('url' in config && /^\//.test(config.url)) {
					config.url = config.url.replace(/^\//, '');
				}

				if ('url' in config && !new RegExp('^' + base).test(config.url)) {
					config.url = [base, config.url].join('/');
				}

				options = kx.combine({}, config, {type:type});
				key = JSON.stringify(options);

				fetch(options, function() {
					if (type === 'get') {
						cache[key] = arguments;
					}

					if (typeof callback === 'function') {
						callback.apply(api, arguments);
					}
				});

				return api;
			};
		}

		api.fetch = method('GET');
		api.update = method('PUT');
		api.create = method('POST');
		api.remove = method('DELETE');
	}

	window.API = window.api = new API();
})(window, kx);
