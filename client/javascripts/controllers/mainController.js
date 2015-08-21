application.controller('mainController', function ($scope, $location, authenticationFactory, businessFactory) {
	var self = this;
	$scope.currentBiz = {};
	this.currentBizId = null;

	var checkSession = function() {
		authenticationFactory.checkSession(function(data) {
			if (data.status == false) {
				$location.path("/");
				self.user = false;
				self.business = false;
				self.taskforce = false;
				self.admin = false;
			}
			else {
				$scope.$broadcast('currentClient', {data});
				self.loggedIn = true;
				if (data.type == "user") {
					self.user = true;
				}
				if (data.type == "business") {
					self.business = true;
					this.currentBizId = data.client_id;
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
			checkSession();
		})
	}

	$scope.$on("locationChange", function (events, args) {
		self.location = args.location;
	})

	this.changeLocation = function(location) {
		self.location = location;
		$location.path("/" + location);
	}



	$scope.$on("cart", function (events, args) {
		self.cartQuantity = 0;
		if(args.cart) {
			angular.forEach(args.cart, function (item) {
				self.cartQuantity += item.quantity;
			})
		}
	})

	this.showBusinessProfile = function() {
		businessFactory.showCurrentBusiness(currentBizId, function(data) {
			$scope.currentBiz = data;
			$location.path('/business_profile');
		})
	}

})







