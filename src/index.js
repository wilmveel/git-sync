var express = require('express');

var jobService = require("./services/JobService.js");

var app = express();
var api = express.Router();

app.use("/api", api);

api.get('/jobs', function(req, res, next){

	res.send(jobService.getJobs());
});

// Start server
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
var server = app.listen(port, host);