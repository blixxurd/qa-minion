/* PRIVATE METHODS THAT SUPPORT TEST CASES */
var methods = require('./methods');


/* 	PUBLIC TEST CASES
	- Builds out public JSON endpoint. 
*/
module.exports = function(html, $) {
	return {
		general : {
			googleAnalyticsOld : {
				name: "Google Analytics Code Exists (Universal Analytics)",
				test: function(str) {
					return str.indexOf("_gaq.push(['_setAccount'") > -1 ? true : false;
				}(html)
			},
			googleAnalytics : {
				name: "OLD Google Analytics Code Exists (ga.js)",
				test: function(str) {
					return str.indexOf("['GoogleAnalyticsObject']") > -1 ? true : false;
				}(html)
			},
			googleTagManager : {
				name: "Google Tag manager Exists",
				test: function(str) {
					return str.indexOf("<iframe src=\"//www.googletagmanager.com/") > -1 ? true : false;
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