var express = require('express');
var async = require('async');

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
					if(err) return console.error(err);
					remotes.forEach(function(remote){
						console.log(remote.name, remote.commit.id);
					});
				});
	    	});
		});
	});

	jobService.getJobs(function(err, jobs){
		jobs.forEach(function(job){
			async.parallel([
			    function(callback){
			        gitService.fetch(job.from, callback);
			    },
			    function(callback){
			        gitService.fetch(job.to, callback);
			    }
			],
			function(err, results){
			    if(err) return console.error("Cannot fetch: ", err);

			     console.log(JSON.stringify(results[1]));

			    var from = results[0]['origin/master'];
			    var to = results[1]['origin/master'];

			    console.log(from);
			    console.log(to);
			});
		});
		
	});
};
init();

jobService.getJobs(function(err, jobs){
	console.log("Load jobs from: ", jobs);

});

repositoryService.reloadCallback(function(){
	cronService.killAll();
	init();
});

console.log(__dirname);
app.use(express.static(__dirname));
app.use("/lib", express.static(__dirname + "/../bower_components"));
app.use("/api", api);


api.get('/sync', function(req, res, next){
	jobService.getJobs(function(err, jobs){
		if(err) return console.error(err);
		var job = jobs[0];
		gitService.sync(job);
	});
});


api.get('/jobs', function(req, res, next){
	jobService.getJobs(function(err, jobs){
		console.log("jobs", jobs);
		res.send(jobs);
	});
});

api.get('/repositories', function(req, res, next){
	repositoryService.getRepositories(function(err, repositories){
		res.send(repositories);
	});
});
	
api.get('/repositories/:name', function(req, res, next){
	repositoryService.getRepositories(function(err, repositories){

		repositories.forEach(function(repository){
			console.log(repository);
			if(repository.name == req.params.name){
				return res.send(repository);
			}
		});
		
	});
});

// Start server
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
var server = app.listen(port, host);