/* jshint browser:true,newcap:false */
/* global kx,api,kontext */
(function() {
	'use strict';

	var issue = {id: '', title: '', description: '', state: '', modified: '', created: ''};

	api.fetch('/issue', function(response, status) {
		kontext.bind({list: response.result});
	});

	kontext.bind(issue, document.querySelector('.buggy-detail'));

	kx.event.add('.buggy-list', 'click', 'article', function(event) {
		api.fetch('/issue/' + event.target.getAttribute('data-id'), function(response, status) {
			Object.keys(response.result).forEach(function(key) {
				issue[key] = response.result[key];
			});

			document.body.setAttribute('data-view', 'detail');
		});
	});
})();
