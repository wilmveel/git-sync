var fs = require('fs');
var git = require('gift');
var url = require('url');

var exec = require('child_process').exec;

var store = "./store";

var gitService = {
	
	load: function(repository, callback) {
		var repoUrl = url.parse(repository.url);
		var clonePath = store + "/" + repoUrl.hostname.replace() + repoUrl.path;
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
	}

};

module.exports = gitService;