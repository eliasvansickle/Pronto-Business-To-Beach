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
		addToCart: function(itemID, quantity, callback) {
			$http.post("/user/addToCart/" + itemID, quantity).success(function (data) {
				callback(data);
			})
		}
	}
})