/* jshint browser:true,newcap:false */
/* global kx:true,blocks:true,api:trues */

(function(window, kx) {
	'use strict';

	var App = blocks.Application(),
		Issue = App.Model({
			id: App.Property(),
			title: App.Property(),
			description: App.Property()
		}),
		List = App.Collection(Issue, {
			options: {
				create: {
					url: ''
				}
			}
		}),
		list = [];

	App.View('List', {
		list: List(list),

		create: function() {
			this.list.push({
				title: 'test',
				description: 'yolo'
			});

			console.log('create');

			this.list.sync();
		}
	});

	api.fetch('issue', function(response, status, message) {
		response.result.forEach(function(item) {
			App.View('List').list.push({
				id: item.id,
				title: item.title,
				description: item.description
			});
		});
	});

	window.App = App;
})(window, kx);
