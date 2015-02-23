var fs = require("fs");

var jobs = null;

var jobsFile = __dirname + '/../../config/jobs.json';

function readConfig(){
	fs.readFile(jobsFile, 'utf8', function (err, data) {
		if (err) throw err;
		try{
        	jobs=JSON.parse(data);
	    }catch(e){
	        console.error("Error reading jobs config: ", e);
    	}
	});
}


var jobservice = {
	
	init: function(){
		console.log('Init Jobservice');

		readConfig(jobsFile);

		fs.watchFile(jobsFile, function (curr, prev) {
	  		console.log('Update jobs configuration');
	  		readConfig(jobsFile);
		});
	},

	getJobs: function(){
		return jobs;	
	}

};

jobservice.init();

module.exports = jobservice;