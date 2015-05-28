'use strict';

var Lab = require('lab'),
	Code = require('code'),
	lab = exports.lab = Lab.script(),
	config = require('../../lib/config');

lab.experiment('Config', function() {
	lab.experiment(':get', function() {
		lab.test('should find the key if it exists', function(done) {
			Code.expect(config.get('name')).to.equal('Buggy');

			done();
		});

		lab.test('should find nested config', function(done) {
			Code.expect(config.get('manifest/server/app')).to.be.an.object();

			done();
		});

		lab.test('should throw Error when it can\'t find the config', function(done) {
			try {
				config.get('does/not/exist');
			}
			catch (e) {
				Code.expect(e).to.be.an.object();

				done();
			}
		});
	});

	lab.experiment(':set', function() {
		lab.test('should set config', function(done) {
			config.set('test', 'example');
			Code.expect(config.get('test')).to.equal('example');

			done();
		});

		lab.test('should set nested config', function(done) {
			config.set('path/to/config', 'example');
			Code.expect(config.get('path/to/config')).to.equal('example');

			done();
		});

		lab.test('should be able to add to existing config', function(done) {
			config.set('manifest/test', 'example');
			Code.expect(config.get('manifest/test')).to.equal('example');

			done();
		});
	});
});
