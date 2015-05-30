/* jshint browser:true,newcap:false */
/* global kx:true,blocks:true,api:trues */

(function(window, kx) {
	'use strict';

	api.fetch('issue', function(response, status, message) {
		var App = blocks.Application(),
			Issue = App.Model({
				id: App.Property(),
				title: App.Property(),
				description: App.Property()
			}),
			List = App.Collection(Issue),
			list = [];

		response.result.forEach(function(item) {
			list.push({
				id: item.id,
				title: item.title,
				description: item.description
			});
		});

		App.View('List', {
			list: List(list)
		});
	});
})(window, kx);
