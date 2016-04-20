/* jshint browser:true,newcap:false */
/* global kx,api,kontext */
(function() {
	'use strict';

	api.fetch('/issue', function(response, status) {
		kontext.bind({list: response.result});
	});
})();
