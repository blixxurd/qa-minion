/* 
	INITIALIZE SELFQA WRAPPER
	Dependencies: None
*/
var apiUi = angular.module("apiUi", []);

apiUi.config(function() {});

apiUi.run(function() {

});

apiUi.controller('formCtrl', function($scope,$http) {

	var methods = {
		get : function() {
			$scope.error_message = "";
			if($scope.url.indexOf("://") == -1 || $scope.url == "") {
				$scope.error_message = "Not a properly formatted URL.";
				return;
			}
			var req = $http.get("/api/?q="+$scope.url);
			req.success(function(data, status, headers, config) {
				$scope.test_data = data;
				window.history.pushState("", "Test Results: "+$scope.url, "/web/"+$scope.url);
			});
			req.error(function(data, status, headers, config) {
				$scope.error_message = "Something went wrong.";
			});
		}
	}

	$scope.processing = false;
	$scope.methods = methods;

});