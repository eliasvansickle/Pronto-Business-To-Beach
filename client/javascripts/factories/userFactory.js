application.factory('userFactory', function ($http) {
	return {
		showBusinesses: function(callback) {
			$http.get('/businesses').success(function (data) {
				callback(data);
			})
		},
		showMenu: function() {
			
		} 
	}
})