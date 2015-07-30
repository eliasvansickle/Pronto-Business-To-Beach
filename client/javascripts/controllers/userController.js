application.controller('userController', function (userFactory, businessFactory) {
	var self = this;

	userFactory.showBusinesses(function (data) {
		self.businesses = data;
	})

	var showItems = function(businessID) {
		businessFactory.showItems(businessID, function (data) {
			self.items = data.menu;
		})
	}

	this.
})