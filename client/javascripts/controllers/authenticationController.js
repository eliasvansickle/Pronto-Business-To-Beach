application.controller('authenticationController', function($scope, $location, authenticationFactory) {
	$scope.user_reg_success = authenticationFactory.user_reg_success;

	$scope.createUser = function(newUser) {
		authenticationFactory.createUser(newUser, function(data) {
			$scope.user_reg_errors = data.user_reg_errors;
			if(data.user_reg_errors == null) {
				$location.path('login');
				authenticationFactory.user_reg_success = data.user_reg_success;
			}
		})
		$scope.newUser = {};
	}
	$scope.createBusiness = function(newBusiness) {
		authenticationFactory.createBusiness(newBusiness, function(data) {
			$scope.biz_reg_success = data.biz_reg_success;
			$scope.biz_reg_errors = data.biz_reg_errors;
		})
		$scope.newBusiness = {};
		
	}
	$scope.createTaskforce = function(newTaskforce) {
		authenticationFactory.createTaskforce(newTaskforce, function(data) {
			$scope.taskforce_reg_success = data.taskforce_reg_success;
			$scope.taskforce_reg_errors = data.taskforce_reg_errors;

		})
		$scope.newTaskforce = {};
	} 
	$scope.login = function(client) {
		authenticationFactory.login(client, function(data) {
			if(data.type == 'admin') {
				$location.path('/admin_users');
			}
			else if(data.type == 'user') {
				$location.path('/user_dashboard');
			}
			else if(data.type == 'business') {
				$location.path('/business_current_orders');
			}
			else {
				$location.path('/taskforce_recieve_orders');
			}
			$scope.login_fail = data.login_fail;
		})
		$scope.client = {};
	}
})




















