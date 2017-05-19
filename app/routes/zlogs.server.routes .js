'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	zlogs = require('../../app/controllers/zlogs.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/zlogs')
		.get(zlogs.list)
		.post(users.requiresLogin, zlogs.create);

		app.route('zlogs/search')
		.get(zlogs.list); 		
		
	app.route('/zlogs/:zlogId')
		.get(zlogs.read)
		.put(users.requiresLogin, zlogs.hasAuthorization, zlogs.update)
		.delete(users.requiresLogin, zlogs.hasAuthorization, zlogs.delete);
		
	// Finish by binding the article middleware
	app.param('zlogId', zlogs.zlogByID);
};
