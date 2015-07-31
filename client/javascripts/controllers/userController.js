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

	this.updateCartItemTemplate = {
		templateUrl: 'updateCartItem.html'
	}

	$scope.$on('successful_order', function() {
		userFactory.checkOut(function() {
			console.log("fired");
		})
	})

	userFactory.showCartItems(function(data) {
		$scope.cartItems = data.cart;
	})

	this.addToCart = function(itemID, quantity) {
		userFactory.addToCart(itemID, quantity, function (cart) {
			$scope.$emit("cart", {cart: cart});
		})
	}
	this.updateCart = function(cartItem) {
		userFactory.updateCart(cartItem, function() {
			userFactory.showCartItems(function(data) {
				$scope.cartItems = data.cart;
			})
		})
	}
	this.deleteCartItem = function(cartItem) {
		userFactory.deleteCartItem(cartItem._id, function() {
			userFactory.showCartItems(function(data) {
				$scope.cartItems = data.cart;
			})
		})
	}
})
