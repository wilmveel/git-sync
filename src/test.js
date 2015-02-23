var git  = require('gift');


repo = git("C:\\Projects\\Github\\git-sync\\.git");


repo.commits (function(err, commits){
	if (err) console.error(err);
	else console.log(commits);
});