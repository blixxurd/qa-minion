/* LOAD DEPENDENCIES */
var express = require('express'),
		request = require('request'),
		cheerio	= require('cheerio'),
		path 		= require('path'),
		app 		= new express(),

		/* CONFIGURATION SETUP */
		config	= {port: 8081},

		/* BASE HELPER METHODS */
		methods = (function($) {
			return {
				stripTags: function(str) {
						return String(str).replace(/<\/?[^>]+(>|$)/g, '');
				},
				findElem: function(element, attribute, output) {

					//////// ADD TEST CASE FOR NO ATTRIBUTE, JUST COUNTS TOTAL ELEMENTS
					//////// ADD ELEMENT DOM WALK OUTPUT SO DEVS CAN FIND THE EXCEPTIONS & FIX THEM

					$(element).each(function() {
						if ($(this).attr(attribute) != ('' || null)) {
							switch (typeof output) {
								case 'number':
									output++;
									break;
								default:
									return true;
							}
						}
					});
					return (typeof output == 'boolean') ? false : output;
				}
			};
		}),

		testConfig = function(html, $) {
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
				},
				accessibility : {
					img_alts : {
						name: "Image Alt Tags",
						test: methods($).findElem("img", "alt"),
						count: methods($).findElem("img", "alt", 0)
					}
				}
			}
		};

/* INITIALIZE APP */
app
	/* WEB FOLDER EXISTS TO ADD FRONTEND CODE FOR A UI */
	.get('/web*', function(req, res) {
		thingToGet = req["originalUrl"];
			res.sendFile(path.join(__dirname + thingToGet));
	})

	/* RETURN PASSES ON PAGENAME THROUGH A JSON API ENDPOINT */
	.get('/', function(req, res){
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
