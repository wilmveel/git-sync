angular.module("git-sync-manager")

.controller("NavbarController", function($scope, $log){
	
	$scope.active = function(link){

		$log.debug(link);
	};

});