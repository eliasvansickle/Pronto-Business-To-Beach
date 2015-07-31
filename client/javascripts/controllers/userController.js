application.controller('userController', function ($scope, $timeout, $location, userFactory, businessFactory) {
	var self = this;

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
			businessFactory.showItems(userFactory.currentMenuID, function (data) {
				self.items = data.menu;
			})
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
	$scope.$on('checkout', function() {
		userFactory.showCartItems(function(data) {
			console.log('callback here to set scope', data);
			// $scope.cartItems = data.cart;
		})
	})
	this.addToCart = function(itemID, quantity) {
		userFactory.addToCart(itemID, quantity, function (cart) {
			$scope.$emit("cart", {cart: cart});
		})
	}
})