/* LOAD DEPENDENCIES */
var express = require('express');
var request = require('request');
var cheerio	= require('cheerio');
var path 	= require('path');
var app 	= new express();

/* CONFIGURATION SETUP */
var config	= {
	port: 8081
};

/* BASE HELPER METHODS */
var methods = {
	stripTags: function(str) {
    	return String(str).replace(/<\/?[^>]+(>|$)/g, '');
	}
}

var testConfig = function(html, $) {
	return {
		general : {
			googleAnalytics : {
				name: "Google Analytics Code Exists",
				test: function(str) {
					return str.indexOf("['GoogleAnalyticsObject']") > -1 ? true : false;
				}(html)
			}
		},
		seo : {
			h1s_present : {
				name: "H1 on Page",
				test: function() {
					return $("h1").length > 0;
				}(),
				count: function() {
					return $("h1").length;
				}() 
			}
		}
	}
}

/* WEB FOLDER EXISTS TO ADD FRONTEND CODE FOR A UI */
app.get('/web*', function(req, res) {
	thingToGet = req["originalUrl"];
    res.sendFile(path.join(__dirname + thingToGet));
});

/* RETURN PASSES ON PAGENAME THROUGH A JSON API */
app.get('/', function(req, res){
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
});

/* LISTEN ON PORT */
app.listen(config.port);
console.log('Self QA Assistant Started on Port 8081');
exports = module.exports = app;