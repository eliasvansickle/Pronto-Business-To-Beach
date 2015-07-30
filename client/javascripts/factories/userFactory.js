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
			console.log("IN FACTORY", this.currentMenuID)
			callback();
		}
	}
})