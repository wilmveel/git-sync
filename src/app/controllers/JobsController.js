angular.module("git-sync-manager")

.controller("ListJobsController", function($scope, $http){
	
	$scope.jobs = [];

	$http.get('/api/jobs')
	.success(function(jobs){
		$scope.jobs = jobs;
	});

})

.controller("FormJobsController", function($scope, $http){
	
	$scope.job = {};

	$scope.add = function(){
		$http.post('/api/jobs', $scope.job)
		.success(function(jobs){
			$scope.jobs = jobs;
		});
	};

});