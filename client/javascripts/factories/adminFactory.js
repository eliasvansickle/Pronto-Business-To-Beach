application.factory('adminFactory', function($http) {
	var factory = {};

	factory.user_to_be_updated = {};
	factory.business_to_be_updated = {};
	factory.taskforce_to_be_updated = {};
	factory.currentAdmin = {};

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
	factory.showUserProfile = function(user_id, callback) {
		$http.get('/userProfile/'+user_id).success(function(data) {
			factory.user_to_be_updated = data;
			callback();
		})
	}
	factory.showBusinessProfile = function(business_id, callback) {
		$http.get('/businessProfile/'+business_id).success(function(data) {
			factory.business_to_be_updated = data;
			callback();
		})
	}
	factory.showTaskforceProfile = function(taskforce_id, callback) {
		$http.get('/taskforceProfile/'+taskforce_id).success(function(data) {
			factory.taskforce_to_be_updated = data;
			callback();
		})
	}
	factory.updateTaskforce = function(taskforce, callback) {
		$http.post('/taskforceProfile/update', taskforce).success(function() {
			callback();
		})
	}
	factory.updateBusiness = function(business, callback) {
		$http.post('/businessProfile/update', business).success(function() {
			callback();
		})
	}
	factory.updateUser = function(user, callback) {
		$http.post('/userProfile/update', user).success(function() {
			callback();
		})
	}
	factory.deleteUser = function(user_id, callback) {
		$http.post('/users/delete/'+user_id).success(function() {
			callback();
		})
	}
	factory.deleteBusiness = function(business_id, callback) {
		$http.post('/business/delete/'+business_id).success(function() {
			callback();
		})
	}
	factory.deleteTaskforce = function(taskforce_id, callback) {
		$http.post('/taskforce/delete/'+taskforce_id).success(function() {
			callback();
		})
	}
	factory.sendEmail = function(data, callback) {
		console.log(data);
		$http.post('/admin/sendEmail', data).success(function(data) {
			callback(data);
		})
	}


	return factory;
})































