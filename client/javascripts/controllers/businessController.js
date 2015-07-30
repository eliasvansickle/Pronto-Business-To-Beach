application.controller('businessController', function ($scope, businessFactory) {
	$scope.$emit('checkSession');

	$scope.$on('currentClient', function(event, args) {
		console.log(args);
		console.log(event);
		// var currentClient = args;
		// console.log(currentClient);
	})

	this.createItem = function(newItem) {
		console.log(newItem);
	}

	this.updateMenuItem = function(itemID, updatedItem) {
		businessFactory.updateMenuItem(itemID, updateMenuItem, function() {

		})
	}
})