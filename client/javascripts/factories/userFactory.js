application.factory('userFactory', function ($http) {
	return {
		currentMenuID: null,
		showBusinesses: function(callback) {
			$http.get('/businesses').success(function (data) {
				callback(data);
			})
		},
		visitMenu: function(businessID, callback) {
			this.currentMenuID = businessID;
			callback();
		},
		showCartItems: function(callback) {
			$http.get('/cart/show').success(function(data) {
				callback(data);
			})
		},
		addToCart: function(itemID, quantity, callback) {
			$http.post("/user/addToCart/" + itemID, quantity).success(function (data) {
				callback(data);
			})
		},
		updateCart: function(cartItem, callback) {
			$http.post('/cart/update/'+cartItem._id, cartItem).success(function() {
				callback();
			})
		},
		deleteCartItem: function(cartItemId, callback) {
			$http.delete('/cart/delete/'+cartItemId).success(function() {
				callback();
			})
		},
		checkOut: function(total_amount, callback) {
			$http.post("/user/checkOut", total_amount).success(function() {
				callback();
			})
		},
		createCharge: function(data, callback) {
			$http.post('/charge', data).success(function() {
				callback();
			})
		},
		getDeliveryQuote: function(dropOffLocation, businessIdForPickUp, callback) {
			var data = {
				businessIdForPickUp: businessIdForPickUp,
				dropOffLocation: dropOffLocation
			};
			$http.post('/user/deliveryQuote', data).success(function(data) {
				callback(data);
			})
		}
	}
})