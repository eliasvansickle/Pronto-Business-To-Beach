application.controller('mainController', function ($scope, $location, authenticationFactory) {
	var self = this;
	$scope.currentBiz = {};

	var checkSession = function() {
		authenticationFactory.checkSession(function(data) {
			if (data.status == false) {
				$location.path("/");
			}
			else
			{
				$scope.$broadcast('currentClient', {data});
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
			self.location = null;
			$location.path("/");
		})
	}

	$scope.$on("locationChange", function (events, args) {
		self.location = args.location;
	})

	this.changeLocation = function(location) {
		self.location = location;
		if(location == 'checkout') {
			$scope.$broadcast('checkout');
		}
		$location.path("/" + location);

	}
})