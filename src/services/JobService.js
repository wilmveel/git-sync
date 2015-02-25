var fs = require("fs");

var jobs = null;

var file = __dirname + '/../../config/jobs.json';

/*
 * Read config file.
 */
var readFile = function(callback){
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) callback(err);
		try{
			console.log("Load jobs from: ", file);
        	jobs=JSON.parse(data);
        	callback(null, jobs);
	    }catch(e){
	        console.error("Error reading jobs config: ", e);
    	}
	});
};

fs.watchFile(file, function(){
	readFile(function(err, remotes){});
});

var jobservice = {

	getJobs: function(callback){
		if(jobs){
			callback(null, jobs);
		}else{
			readFile(function(err, jobs){
				if(err) callback(err);
				else callback(null, jobs);
			});
		}	
	},
	
	findJobsbyRemote: function(remote, callback){
		jobs.foreEach(function(job){
			if(job.from == remote.url || job.from == remote.url){
				callback(null, job);
			}
		});	
	}
};

module.exports = jobservice;