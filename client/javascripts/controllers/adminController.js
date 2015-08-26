application.controller('adminUsersController', function($scope, $location, adminFactory) {
	$scope.currentAdmin = adminFactory.currentAdmin;
	adminFactory.showUsers(function(data) {
		$scope.users = data;
	})
	
	$scope.showUserProfile = function(user_id) {
		adminFactory.showUserProfile(user_id, function() {
			$location.path('/update_user_profile');
		});
	}
	
	$scope.deleteUser = function(user_id) {
		adminFactory.deleteUser(user_id, function() {
			adminFactory.showUsers(function(data) {
				$scope.users = data;
			})
		})
	}

	$(document).on('click', '#emailUserLink', function() {
		var email_address = $(this).data('email');
		$('.modal-body #email_address').val(email_address);
	})

	$scope.sendEmail = function(from) {
		var to = $('#email_address').val();
		var subject = $('#email_subject').val();
		var content = $('#email_content').val();
		var data = {to: to, subject: subject, content: content};
		adminFactory.sendEmail(data, function(data) {
			console.log('callback here',data);
			$('#sendEmailToUser').modal('toggle');
			$('#successfullySentEmail').modal('toggle');
		})
	}

})


application.controller('adminUpdateUserController', function($scope, $location, adminFactory) {
	$scope.user = adminFactory.user_to_be_updated;

	$scope.updateUser = function(user) {
		adminFactory.updateUser(user, function() {
			$location.path('/admin_users');
		})
	}
})


application.controller('adminBusinessController', function($scope, $location, adminFactory) {
	adminFactory.showBusinesses(function(data) {
		$scope.businesses = data;
	})
	
	$scope.showBusinessProfile = function(business_id) {
		adminFactory.showBusinessProfile(business_id, function() {
			$location.path('/update_business_profile');
		})
	}
	
	$scope.deleteBusiness = function(business_id) {
		adminFactory.deleteBusiness(business_id, function() {
			adminFactory.showBusinesses(function(data) {
				$scope.businesses = data;
			})
		})
	}
})


application.controller('adminUpdateBusinessController', function($scope, $location, adminFactory) {
	$scope.business = adminFactory.business_to_be_updated;

	$scope.updateBusiness = function(business) {
		adminFactory.updateBusiness(business, function() {
			$location.path('/admin_business');
		})
	}

})


application.controller('adminTaskforceController', function($scope, $location, adminFactory) {
	adminFactory.showTaskforceMembers(function(data) {
		$scope.taskforce_members = data;
	})

	$scope.showTaskforceProfile = function(taskforce_id) {
		adminFactory.showTaskforceProfile(taskforce_id, function() {
			$location.path('/update_taskforce_profile');
		})
	}

	$scope.deleteTaskforce = function(taskforce_id) {
		adminFactory.deleteTaskforce(taskforce_id, function() {
			adminFactory.showTaskforceMembers(function(data) {
				$scope.taskforce_members = data;
			})
		})
	}
})


application.controller('adminUpdateTaskforceController', function($scope, $location, adminFactory) {
	$scope.taskforce = adminFactory.taskforce_to_be_updated;

	$scope.updateTaskforce = function(taskforce) {
		adminFactory.updateTaskforce(taskforce, function() {
			$location.path('/admin_taskforce');
		})
	}
})