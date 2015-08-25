application.controller('userController', function ($scope, $timeout, $location, userFactory, businessFactory, $socket) {
	var self = this;
	this.cartCount = false;


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

	this.processOrder = function() {

		$('#DeliveryQuote').modal('toggle');

		var delivery_fee = Number($scope.delivery_fee.replace(/[^0-9\.]+/g,""));
		var pronto_premium = Number($scope.pronto_premium.replace(/[^0-9\.]+/g,""));
		self.total_amount += delivery_fee;
		self.total_amount += pronto_premium;

		stripeCharge();
	}


	function updateTotal() {
		self.total_amount = 0;
		for (i in $scope.cartItems) {
			self.total_amount += $scope.cartItems[i].price * $scope.cartItems[i].quantity;
		}
		$scope.$emit("cart", {cart: $scope.cartItems});


		if($scope.cartItems != undefined) {
			if($scope.cartItems.length > 0) {
				self.cartCount = true;
			}
		}
		if($scope.cartItems == undefined || $scope.cartItems.length == 0 || self.total_amount == 0) {
			self.cartCount = false;
		}
	}

	userFactory.showCartItems(function(data) {
		$scope.cartItems = data.cart;
		updateTotal();
	})

	this.addToCart = function(itemID, businessID, quantity) {

		if($scope.cartItems == undefined || $scope.cartItems.length == 0) {
			userFactory.addToCart(itemID, quantity, function (cart) {
				$scope.$emit("cart", {cart: cart});
			})
		}
		else {
			var prevBusinessID = $scope.cartItems[0]._business;

				if(businessID != prevBusinessID) {
					$scope.addToCartError = 'Unfortunately for delivery purposes, items may only be added from one business';
				}
				else {
					userFactory.addToCart(itemID, quantity, function (cart) {
						$scope.$emit("cart", {cart: cart});
					})
				}
		}	
	}
	this.updateCart = function(cartItem) {
		userFactory.updateCart(cartItem, function() {
			userFactory.showCartItems(function(data) {
				$scope.cartItems = data.cart;
				updateTotal();
			})
		})
	}
	this.deleteCartItem = function(cartItem) {
		userFactory.deleteCartItem(cartItem._id, function() {
			userFactory.showCartItems(function(data) {
				$scope.cartItems = data.cart;
				updateTotal();
			})
		})
	}


	///////////////////////////////STRIPE/////////////////////////////////////////
	var handler = StripeCheckout.configure({
	    key: 'pk_test_IEWVlOCvUGfBtXWxxqGWU6Z1',
	    // image: '/img/documentation/checkout/marketplace.png',
	    token: function(token) {
	    	var amount = self.total_amount * 100;
	    	data = {token: token, amount: amount};
	    	userFactory.createCharge(data, function() {
	    		console.log('finished charging the user for their order');
	    		userFactory.checkOut({total_amount: self.total_amount}, function(order) {
					console.log('order added', order);
					$socket.emit('order_added', order);
				
					finalize();
				})
				function finalize() {
		    		$scope.cartItems = null;
		    		updateTotal();
		    		$location.path('/successful_order');
				}
	    	})
	    }
	  });

	function stripeCharge() {
		// Open Checkout with further options
		handler.open({
			name: 'Pronto Delivery',
			description: $scope.cartItems.length + ' items',
			amount: (self.total_amount * 100)
		});
	};

	// Close Checkout on page navigation
	$(window).on('popstate', function() {
		handler.close();
	});


///////////////////////////////GOOGLE MAPS/////////////////////////////////////////
	$(document).ready(function() {

		$('#getDeliveryQuote').on('click', function() {
			function initialize() {

			  var map = new google.maps.Map(document.getElementById('map'), {
			    center: {lat: 40.985976, lng: -72.172432},
			    zoom: 11
			  });
			  var input = /** @type {!HTMLInputElement} */(
			      document.getElementById('autocompleteLocation'));

			  var autocomplete = new google.maps.places.Autocomplete(input);
			  autocomplete.bindTo('bounds', map);

			  var infowindow = new google.maps.InfoWindow();
			  var marker = new google.maps.Marker({
			    map: map,
			    anchorPoint: new google.maps.Point(0, -29)
			  });

			  autocomplete.addListener('place_changed', function() {
			    infowindow.close();
			    marker.setVisible(false);
			    var place = autocomplete.getPlace();
			    if (!place.geometry) {
			      window.alert("Autocomplete's returned place contains no geometry");
			      return;
			    }

			    // If the place has a geometry, then present it on a map.
			    if (place.geometry.viewport) {
			      map.fitBounds(place.geometry.viewport);
			    } else {
			      map.setCenter(place.geometry.location);
			      map.setZoom(17);  // Why 17? Because it looks good.
			    }
			    marker.setIcon(/** @type {google.maps.Icon} */({
			      url: place.icon,
			      size: new google.maps.Size(71, 71),
			      origin: new google.maps.Point(0, 0),
			      anchor: new google.maps.Point(17, 34),
			      scaledSize: new google.maps.Size(35, 35)
			    }));
			    marker.setPosition(place.geometry.location);
			    marker.setVisible(true);

			    var address = '';
			    if (place.address_components) {
			      address = [
			        (place.address_components[0] && place.address_components[0].short_name || ''),
			        (place.address_components[1] && place.address_components[1].short_name || ''),
			        (place.address_components[2] && place.address_components[2].short_name || '')
			      ].join(' ');
			    }

			    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
			    infowindow.open(map, marker);
			  });
			}
			initialize();
		})
	})

/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$('#backToAddressInput').on('click', function() {
			$('#DeliveryQuote').modal('toggle');
			$('#getDeliveryQuote').modal('toggle');

		})


	this.getDeliveryQuote = function() {
		businessIdForPickUp = $('#autocompleteLocation').val();
		dropOffLocation = $('#PickUpBusinessId').val();

		userFactory.getDeliveryQuote(businessIdForPickUp, dropOffLocation, function(data) {

			$('#getDeliveryQuote').modal('toggle');

			function currencyFormat (num) {
					var num = num / 100;
				    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
				}
			$scope.delivery_fee = currencyFormat(data.fee);
			$scope.pronto_premium = currencyFormat(data.fee * .1);


			$('#DeliveryQuote').modal('toggle');
		}) 
	}
})
