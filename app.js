'use strict';

var request = require('request');

var twitterData = [];

var states = {
	twitterdata: false
};

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


function startKue() {
	
}

var outputDownload = function status() {
	console.info('########');
	console.info(new Date());
	console.info('TwitterData loaded: ', states.twitterdata);
}


setInterval(outputDownload, 1000);



