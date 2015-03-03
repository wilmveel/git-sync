angular.module("git-sync-manager", [
	'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider
    .when('/jobs', {
        templateUrl: 'views/jobs_list.html',
        controller: 'ListJobsController'
    })
    .when('/jobs/add', {
        templateUrl: 'views/jobs_form.html',
        controller: 'FormJobsController'
    })
    .when('/repositories', {
        templateUrl: 'views/repositories_list.html',
        controller: 'ListRepositoriesController'
    })
    .when('/repositories/add', {
        templateUrl: 'views/repositories_form.html',
        controller: 'FormRepositoriesController'
    })
    .when('/repositories/:name', {
        templateUrl: 'views/repositories_form.html',
        controller: 'FormRepositoriesController'
    })
    .otherwise({
        redirectTo: '/jobs'
    });
});