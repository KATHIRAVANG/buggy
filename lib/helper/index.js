'use strict';

var lodash = require('lodash');

module.exports = lodash.extend(lodash.prototype, {
	id: function id() {
		var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''),
			result = [alphabet[Math.round(Math.random() * 25)]];

		while (result.length < 11) {
			result.push(alphabet[Math.round(Math.random() * (alphabet.length - 1))]);
		}

		return result.join('');
	},

	isId: function isId(value) {
		return /[a-z][a-z0-9]{10}/.test(value);
	}
});
