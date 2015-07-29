application.controller('mainController', function ($scope, $location, authenticationFactory) {
	var self = this;

	var checkSession = function() {
		authenticationFactory.checkSession(function(data) {
			if (data.status == false) {
				$location.path("/");
			}
			else
			{
				self.loggedIn = true;
				if (data.type == "user") {
					self.user = true;
				}
				if (data.type == "business") {
					self.business = true;
				}
				if (data.type == "taskforce") {
					self.taskforce = true;
				}
				if (data.type == "admin") {
					self.admin = true;
				}
			}
		})
	}

	checkSession();

	$scope.$on("checkSession", function (events, args) {
		checkSession();
	});

	this.logOut = function() {
		authenticationFactory.logOut(function() {
			self.loggedIn = false;
			$location.path("/");
		})
	}
})