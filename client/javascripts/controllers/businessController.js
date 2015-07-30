application.controller('businessController', function ($scope, businessFactory) {

	$scope.$emit('checkSession');
	var currentClient;
	var self = this;

	var showItems = function() {

		businessFactory.showItems(currentClient.client_id, function(data) {
			$scope.items = data.menu;
			console.log(data.menu);
		})
	}


	$scope.$on('currentClient', function(event, args) {
		currentClient = {client_id: args.data.client_id, client_type: args.data.type};
		showItems();
	})

	this.createItem = function(newItem) {
		var business_id = currentClient.client_id;
		businessFactory.createItem(newItem, business_id, function(){
			showItems();
		})
		self.newItem = {};
	}

	this.updateMenuItem = function(itemID, updatedItem) {
		businessFactory.updateMenuItem(itemID, updateMenuItem, function() {

		})
	}
})