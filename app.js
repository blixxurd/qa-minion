/* LOAD DEPENDENCIES */
var express = require('express'),
	request = require('request'),
	cheerio	= require('cheerio'),
	path 		= require('path'),
	app 		= new express(),

	/* CONFIGURATION SETUP */
	config	= {port: 8081},

	/* BASE HELPER METHODS */
	testConfig = require('./inc/tests');

/* INITIALIZE APP */
app
	/* WEB FOLDER EXISTS TO ADD FRONTEND CODE FOR A UI */
	.get('/web*', function(req, res) {
		thingToGet = req["originalUrl"];
		res.sendFile(path.join(__dirname + (thingToGet || "index.html")));
	})

	/* RETURN PASSES ON PAGENAME THROUGH A JSON API ENDPOINT */
	.get('/api', function(req, res){
		query = req.query.q ? req.query.q : "http://aaronbartholomew.com/";
		output = {
			results: [],
			string: ""
		};
		request(query, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);
			}
			res.json(testConfig(html, $));
		});
	})


	/* LISTEN ON PORT */
	.listen(config.port);

/*LOG START, SET EXPORTS IF NEEDED */
console.log('Self QA Assistant Started on Port 8081');
exports = module.exports = app;
