angular.module("git-sync-manager")

.controller("ListRepositoriesController", function($scope, $http, $location){
	
	$scope.repositories = [];

	$http.get('/api/repositories')
	.success(function(repositories){
		$scope.repositories = repositories;
	});

	$scope.goAdd = function(){
		$location.path("/repositories/add");
	};

	$scope.goEdit = function(repository){
		$location.path("/repositories/" + repository.name);
	};

})

.controller("FormRepositoriesController", function($scope, $http, $routeParams){
	
	$scope.repository = {};
	console.log($routeParams.name);
	//if($routeParams.name){
		$http.get('/api/repositories/' + $routeParams.name)
		.success(function(repository){
			console.log(repository);
			$scope.repository = repository;
		});
	//}

	$scope.save = function(){
		
		if($routeParams.name){
			$http.put('/api/repositories/' + $routeParams.name, $scope.repository)
			.success(function(jobs){
				$scope.jobs = jobs;
			});
		}else{
			$http.post('/api/repositories', $scope.repository)
			.success(function(jobs){
				$scope.jobs = jobs;
			});
		}
	};

});