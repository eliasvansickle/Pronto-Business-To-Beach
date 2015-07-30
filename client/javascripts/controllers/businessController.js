application.controller('businessController', function($scope) {
	$scope.$emit('checkSession');

	$scope.$on('currentClient', function(event, args) {
		var currentClient = {client_id: args.data.client_id, client_type: args.data.type};
	})

	this.createItem = function(newItem) {
		console.log(newItem);
		console.log(currentClient);
	}
})