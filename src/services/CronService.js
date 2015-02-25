var Cron = require('cron');

var crons = [];

var cronService = {
	
	create: function(repository, func) {
		var cron = new Cron.CronJob(repository.cron, func);
		cron.start();
		crons.push(cron);
	},

	killAll: function() {
		crons.forEach(function(cron){
			cron.stop();
		});
		crons = [];
		console.log("Kill crones");
	},

	startAll: function() {
		crons.forEach(function(cron){
			cron.start();
		});
	},
	
	stopAll: function() {
		crons.forEach(function(cron){
			cron.stop();
		});
	}
};

module.exports = cronService;