'use strict';
var EMPTYQUEUE = process.argv[2] === '--clean' ? true : false;

var request = require('request');
var kue = require('kue'),
queue = kue.createQueue();
kue.app.listen(8080);

var twitterData = [];

var states = {
	twitterdata: false,
	queued: 0,
	sent: 0,
	completed: 0,
	success: 0,
	failed: 0
};

if(!EMPTYQUEUE) {
	request('http://localhost:3000/tweet_imports.json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
			twitterData = body;
			states.twitterdata = true;
			startKue();
		} else {
			console.log(error);
			console.log(response);
		}
	});
}

function startKue() {
	_.each(twitterData, function(tweet){
		var job = queue.create('twitter_request', {
			tweet: tweet
		}).removeOnComplete(true).save();
	});
}


queue.process('twitter_request', 1, function(job, done){
	//Call with id

	/*
	request('http://localhost:3000/twitter_connection/', function (error, response, body) {
			if(!error){

			}
		});
		*/
	console.log(job.data.tweet.id);
	done && done();
});

var outputDownload = function status() {
	console.info('########');
	console.info(new Date());
	console.info('TwitterData loaded: ', states.twitterdata);
}


setInterval(outputDownload, 1000);



