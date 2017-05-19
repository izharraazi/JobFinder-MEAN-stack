'use strict';

// Configuring the Articles module
angular.module('zlogs').run(['Menus',
	function(Menus) {

		Menus.addMenuItem('topbar','Reports','zlogs','dropdown','/zlogs(/create)?');
		Menus.addSubMenuItem('topbar','zlogs','Phone History','zlogs');
		
		
	}
]);



