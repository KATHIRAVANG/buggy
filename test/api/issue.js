'use strict';

var Lab = require('lab'),
	lab = exports.lab = Lab.script(),
	Code = require('code'),
	server = require('../../index'),
	base = '/api/v1/issue',
	data = {
		id: 'a1237fghijk',
		title: 'TEST',
		description: 'THIS IS A TEST ISSUE'
	},
	newData = {
		title: 'NEW TEST TITLE'
	};

lab.experiment('API', function() {
	lab.experiment('GET ' + base, function() {
		lab.test('should return a list', function(done) {
			server.inject({method: 'GET', url: base}, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				Code.expect(response.result).to.be.an.array();
				Code.expect(response.headers['content-type']).to.include('application/json');

				done();
			});
		});
	});

	lab.experiment('POST ' + base, function() {
		lab.test('should return a model', function(done) {
			server.inject({method: 'POST', url: base, payload: data}, function(response) {
				Code.expect(response.statusCode).to.equal(201);
				Code.expect(response.result).to.be.an.object();
				Code.expect(response.result.title).to.equal(data.title);
				Code.expect(response.headers['content-type']).to.include('application/json');

				server.inject({method: 'DELETE', url: base + '/' + response.result.id}, function(response){
					done();
				});
			});
		});
	});

	lab.experiment('PUT' + base + '/issue/' + data.id, function() {
		lab.test('should save changes and return a model', function(done) {
			server.inject({method: 'PUT', url: base + '/' + data.id, payload: newData}, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				Code.expect(response.result).to.be.an.object();
				Code.expect(response.result.title).to.equal(newData.title);
				Code.expect(response.headers['content-type']).to.include('application/json');

				done();
			});
		});

		lab.test('can create if not exists', function(done) {
			server.inject({method: 'PUT', url: base + '/z1237fghijk'}, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				Code.expect(response.result).to.be.an.object();
				Code.expect(response.result.id).to.equal('z1237fghijk');
				Code.expect(response.headers['content-type']).to.include('application/json');

				server.inject({method: 'DELETE', url: base + '/z1237fghijk'}, function(response){
					done();
				});
			});
		});
	});

	lab.experiment('DELETE' + base + '/' + data.id, function() {
		lab.test('should delete model', function(done) {
			server.inject({method: 'DELETE', url: base + '/' + data.id}, function(response) {
				Code.expect(response.statusCode).to.equal(204);
				Code.expect(response.headers['content-type']).to.include('application/json');

				server.inject({method: 'GET', url: base + '/' + data.id}, function(response) {
					Code.expect(response.statusCode).to.equal(404);
					Code.expect(response.headers['content-type']).to.include('application/json');

					done();
				});
			});
		});
	});
});
