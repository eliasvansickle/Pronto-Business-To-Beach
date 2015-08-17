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
		$scope.cartItems = data.cart;
		self.total_amount = 0;
		angular.forEach($scope.cartItems, function (cartItem) {
			self.total_amount += cartItem.total_price;
		})
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
	///////////////////////////////STRIPE/////////////////////////////////////////
	var handler = StripeCheckout.configure({
	    key: 'pk_test_IEWVlOCvUGfBtXWxxqGWU6Z1',
	    // image: '/img/documentation/checkout/marketplace.png',
	    token: function(token) {
	      // Use the token to create the charge with a server-side script.
	      // You can access the token ID with `token.id`
	    }
	  });

	$('#customButton').on('click', function(e) {
		// Open Checkout with further options
		handler.open({
			name: 'Pronto B2B',
			description: $scope.cartItems.length + ' items',
			amount: (self.total_amount * 100)
		});
		e.preventDefault();
	});

	// Close Checkout on page navigation
	$(window).on('popstate', function() {
		handler.close();
	});
///////////////////////////////STRIPE/////////////////////////////////////////


})
