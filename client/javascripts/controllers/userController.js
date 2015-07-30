application.controller('userController', function ($scope, $timeout, $location, userFactory, businessFactory) {
	var self = this;

	$("[data-toggle=popover]").popover();

	userFactory.showBusinesses(function (businesses) {
		self.businesses = [];
		angular.forEach(businesses, function (business) {
			if (business.status == "active") {
				self.businesses.push(business);
			}
		})
	})

	var showItems = function() {
		if (userFactory.currentMenuID != null) {
			console.log(userFactory.currentMenuID)
			console.log("working");
			businessFactory.showItems(userFactory.currentMenuID, function (data) {
				self.items = data.menu;
			})
		}
		else {
			console.log("not working");
		}
	}

	showItems();

	this.visitMenu = function(businessID) {
		userFactory.visitMenu(businessID, function() {
			$scope.$emit("locationChange", {location: "menu"});
			$location.path("/menu");
		})
	}
	this.addToCartTemplate = {
		templateUrl: "addToCart.html"
	}
})