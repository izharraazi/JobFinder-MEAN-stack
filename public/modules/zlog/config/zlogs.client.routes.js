'use strict';

// Setting up route
angular.module('zlogs').config(['$stateProvider',	
	function($stateProvider) {
		// zlog state routing
		$stateProvider.
		state('search', {
			url: '/zlogs',
			templateUrl: 'modules/zlog/views/list-zlog.client.view.html'
		}).
		state('searchZlog', {
			url: '/search',
			templateUrl: 'modules/zlog/views/search-zlog.client.view.html'
		}).
		state('createZlogs', {
			url: '/zlogs/create',
			templateUrl: 'modules/zlog/views/create-zlog.client.view.html'
		}).
		state('viewZlogs', {
			url: '/zlogs/:zlogId',
			templateUrl: 'modules/zlog/views/view-zlog.client.view.html'
		}).
		state('editZlogs', {
			url: '/zlogs/:zlogId/edit',
			templateUrl: 'modules/zlog/views/edit-zlog.client.view.html'
		});
	}
]);