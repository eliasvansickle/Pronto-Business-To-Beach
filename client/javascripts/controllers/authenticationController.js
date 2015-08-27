application.controller('authenticationController', function($scope, $location, authenticationFactory, businessFactory, adminFactory) {
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
			if(client != undefined) {
				if(data.type == 'admin') {
					$scope.$emit("checkSession");
					$scope.$emit('locationChange', {location: 'admin_users'});
					adminFactory.currentAdmin = data;
					$location.path('/admin_users');
				}
				else if(data.type == 'user') {
					$scope.$emit("checkSession");
					$location.path('/user_dashboard');
				}
				else if(data.type == 'business') {
					$scope.$emit("checkSession");
					$scope.$emit("locationChange", {location: 'business_current_orders'})
					businessFactory.currentBusiness = data;
					$location.path('/business_current_orders');
				}
				else if (data.type == "taskforce") {
					$scope.$emit("checkSession");
					$location.path('/taskforce_receive_orders');
				}
			}
			$scope.login_fail = data.login_fail;
		})
		$scope.client = {};
	}
})




















