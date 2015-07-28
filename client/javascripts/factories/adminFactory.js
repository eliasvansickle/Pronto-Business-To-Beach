application.factory('adminFactory', function($http) {
	var factory = {};

	factory.showUsers = function(callback) {
		$http.get('/users').success(function(data) {
			callback(data);
		})
	}
	factory.showBusinesses = function(callback) {
		$http.get('/businesses').success(function(data) {
			callback(data);
		})
	}
	factory.showTaskforceMembers = function(callback) {
		$http.get('/taskforceMembers').success(function(data) {
			callback(data);
		})
	}

	return factory;
})