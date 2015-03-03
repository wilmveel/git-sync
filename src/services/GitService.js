var fs = require('fs');
var git = require('gift');
var url = require('url');

var exec = require('child_process').exec;

var store = "./store";

var gitService = {
	
	load: function(repository, callback) {
		var repoUrl = url.parse(repository.url);
		var clonePath = store + "/" + repoUrl.hostname + repoUrl.path;
		fs.exists(clonePath, function (exists) {
			if(!exists){
				git.clone(repository.url, clonePath, function(err, repo){
					if(err) {
						console.error(err);
						callback(err);
					} 	else {
						callback(null, repo);
					}
				});
			}else{
				var repo = git(clonePath);
				callback(null, repo);
			}
		});
	},

	fetch: function(repository, callback) {
		console.log("fetch");
		gitService.load(repository, function(err, repo){
			if(err) return callback(err);
			repo.remote_fetch("origin", function(err){
				if(err) return callback(err);
				repo.remotes(function(err, remotes){
					if(err) return callback(err);
					else callback(null, remotes);
				});
			});

		});
	},

	sync: function(job, callback) {
		gitService.load(job.to, function(err, toRepo){
			if(err) return callback(err);
			gitService.load(job.from, function(err, fromRepo){
				if(err) return callback(err);
				console.log("from-------------", fromRepo, "to----------------", toRepo);

				git.clone(toRepo.path, "./tmp", function(err, repo){
					if(err) return console.error(err);
					repo.pull(job.from.url, "master", function(err){
						if(err) return console.error(err);
					});
				});
			});

		});
	}

};

module.exports = gitService;