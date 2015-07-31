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

	// ==================================================================
	// ============ AUTOMATICALLY RUN WHEN USER PLACES ORDER ============
	// ==================================================================
	$scope.$on('successful_order', function() {
		userFactory.checkOut({total_amount: self.total_amount}, function() {

		})
	})
	// ==================================================================
	// ==================================================================
	// ==================================================================

	userFactory.showCartItems(function(data) {
		self.cartItems = data.cart;
		self.total_amount = 0;
		angular.forEach(self.cartItems, function (cartItem) {
			self.total_amount += cartItem.total_price;
		})
	})

	this.addToCart = function(itemID, quantity) {
		userFactory.addToCart(itemID, quantity, function (cart) {
			$scope.$emit("cart", {cart: cart});
		})
	}


})
