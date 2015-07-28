application.controller('adminUsersController', function($scope, adminFactory) {
	adminFactory.showUsers(function(data) {
		$scope.users = data;
	})
})

application.controller('adminBusinessController', function($scope, adminFactory) {
	adminFactory.showBusinesses(function(data) {
		$scope.businesses = data;

	})
})

application.controller('adminTaskforceController', function($scope, adminFactory) {
	adminFactory.showTaskforceMembers(function(data) {
		$scope.taskforce_members = data;
	})
})