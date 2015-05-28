var Devour = require('devour'),
	devour = new Devour(require('./config/devour.json'));

devour
	.task('clean')
	.task('script', './client/src/js/**/*.js')
	.task('style', './client/src/css/**/*.css')
	.start();
