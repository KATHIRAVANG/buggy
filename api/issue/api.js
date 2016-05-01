'use strict';

const Config = require('../../lib/config'),
	model = require('../../lib/model'),
	helper = require('../../lib/helper'),
	status = require('hapi-status'),
	Modeller = model(Config.get('database/dsn'));

function API() {
	let api = this,
		model = Modeller.load('issue');

	api.create = function create(request, reply) {
		model.create(request.payload, function(error, model) {
			if (error) {
				return status.internalServerError(reply, error);
			}

			return status.created(reply, model);
		});
	};

	api.list = function list(request, reply) {
		model.find({}, function(error, list) {
			if (error) {
				return status.internalServerError(reply, error);
			}

			return status.ok(reply, list);
		});
	};

	api.fetch = function fetch(request, reply) {
		if (!helper.isId(request.params.id)) {
			return status.badRequest(reply, 'invalid id');
		}

		model.findOne({id: request.params.id}, function(error, response) {
			if (error) {
				return status.internalServerError(reply);
			}

			if (!response) {
				return status.notFound(reply);
			}

			return status.ok(reply, response);
		});
	};

	api.upsert = function upsert(request, reply) {
		model.findOneAndUpdate({id: request.params.id}, request.payload, {new: true, upsert: true}, function(error, model) {
			if (error) {
				return status.internalServerError(reply, error);
			}

			return status.ok(reply, model);
		});
	};

	api.remove = function remove(request, reply) {
		model.findOneAndRemove({id: request.params.id}, function(error, model) {
			if (error) {
				return status.internalServerError(reply, error);
			}

			return status.noContent(reply);
		});
	};
}

module.exports = new API();
