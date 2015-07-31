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
		checkOut: function(callback) {
			
		}
	}
})