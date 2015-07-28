application.factory('authenticationFactory', function($http) {
	var factory = {};
	factory.user_reg_success = '';

	factory.createUser = function(newUser, callback) {
		$http.post('/user/create', newUser).success(function(data) {
			callback(data);
		})
	}

	factory.createBusiness = function(newBusiness, callback) {
		$http.post('/business/create', newBusiness).success(function(data) {
			callback(data);
		})
	}
	factory.createTaskforce = function(newTaskforce, callback) {
		$http.post('/taskforce/create', newTaskforce).success(function(data) {
			callback(data);
		})
	}
	factory.login = function(client, callback) {
		$http.post('/login', client).success(function(data) {
			callback(data);
		})
	}

	return factory;
})