'use strict';

var express = require('express');

var gitService = require("./services/GitService.js");
var cronService = require("./services/CronService.js");
var jobService = require("./services/JobService.js");
var repositoryService = require("./services/RepositoryService.js");

var app = express();
var api = express.Router();

var history = {};


var init = function(){
	repositoryService.getRepositories(function(err, repositories){
		if(err) return console.error(err);
		repositories.forEach(function(repository, key) {
			cronService.create(repository, function(){
	    		gitService.fetch(repository, function(err, remotes){
					if(err) console.error(err);
					remotes.forEach(function(remote){
						console.log(remote.name, remote.commit.id);
					});
				});
	    	});
		});
	});
}
init();

jobService.getJobs(function(jobs){

});

repositoryService.reloadCallback(function(){
	cronService.killAll();
	init();
});


app.use("/api", api);

api.get('/jobs', function(req, res, next){
	res.send(jobService.getJobs());
});

api.get('/repositories', function(req, res, next){
	repositoryService.getRepositories(function(err, repository){
		res.send(repository);
	});
});

// Start server
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
var server = app.listen(port, host);