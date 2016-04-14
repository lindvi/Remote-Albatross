'use strict';

var request = require('request');

var twitterData = [];

var status = {
	twitterdata: false,
	queued: 0,
	sent: 0,
	completed: 0,
	success: 0,
	failed: 0
};

request('http://www.localhost:3000/twitter_imports.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    twitterData = body;
    status.twitterdata = true;
  }
});

var outputDownload = function status() {
	console.info('########');
	console.info(new Date());
	console.info('TwitterData loaded: ', status.twitterdata);
}


setInterval(outputDownload, 1000);



