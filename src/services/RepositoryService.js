var fs = require("fs");

var repositories = null;
var callbacks = [];

/*
 * Config file.
 */
var file = __dirname + '/../../config/repositories.json';

/*
 * Read config file.
 */
var readFile = function(callback){
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) callback(err);
		try{
			console.log("Load repositories from: ", file);
        	repositories=JSON.parse(data);
        	callback(null, repositories);
	    }catch(e){
	        console.error("Error reading repositories config: ", e);
    	}
	});
};

/*
 * Watch config file.
 */
fs.watchFile(file, function(){
	readFile(function(err, repositories){
		callbacks.forEach(function(callback){
			callback();
		});
	})
});

var repositoryService = {
	
	/*
	 * Get the array of remote repositories.
	 */
	getRepositories: function(callback){
		if(repositories){
			callback(null, repositories);
		}else{
			readFile(function(err, repositories){
				if(err) callback(err);
				else callback(null, repositories);
			})
		}
	},

	/*
	 * Add callback method which is triggerd after reloading the config.
	 */
	reloadCallback: function(callback){
		callbacks.push(callback);
	}

};
module.exports = repositoryService;