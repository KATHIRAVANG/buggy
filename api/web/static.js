'use strict';

module.exports = function(request, reply) {
	return reply.file(['.', 'client/build', request.params.extension, request.params.filename + '.' + request.params.extension].join('/'));
};
