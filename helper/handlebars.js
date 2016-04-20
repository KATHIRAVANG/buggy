'use strict';

const handlebars = require('handlebars'),
	subresource = require('subresource'),
	fs = require('fs'),
	md5 = require('md5'),
	cache = {},
	dependencies = {
		development: {
			css: [],
			js: [
				'./public/js/vendor/konflux.js',
				'./public/js/vendor/kontext.js'
			]
		},
		production: {
			css: [],
			js: []
		}
	};

function createTag(type, path) {
	let tag = [
		'crossorigin=anonymous',
		'integrity=' + cache[path].integrity,
		(type === 'js' ? 'src' : 'href') + '=' + path.replace(/\.\/public\/(?:cs|j)s/, '/static/' + cache[path].spoiler)
	];

	if (process.env.NODE_ENV === 'production' && type === 'js' && !/konflux/.test(path)) {
		tag.push('async');
	}

	tag.unshift(type === 'css' ? '<link' : '<script');
	tag.push(type === 'css' ? 'rel=stylesheet />' : '></script>');

	return tag.join(' ');
}

Object.keys(dependencies[process.env.NODE_ENV || 'development']).forEach(type => {
	handlebars.registerHelper(type, function() {
		let html = '';

		dependencies[process.env.NODE_ENV || 'development'][type].forEach(path => {
			let data;

			if (!(path in cache)) {
				cache[path] = subresource(path);
				cache[path].spoiler = md5(fs.readFileSync(path)).substr(0, 5);
			}

			html += createTag(type, path);
		});

		return html;
	});
});
