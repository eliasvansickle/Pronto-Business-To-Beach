application.controller('businessController', function ($timeout, $location, $scope, businessFactory) {

	$scope.$emit('checkSession');
	var currentClient;
	var self = this;

	var showItems = function() {
		businessFactory.showItems(currentClient.client_id, function (data) {
			self.items = data.menu;
		})
	}

	$scope.$on('currentClient', function (event, args) {
		currentClient = {client_id: args.data.client_id, client_type: args.data.type};
		$scope.currentClient = currentClient;
		showItems();
	})

	this.createItem = function(newItem) {
		var business_id = currentClient.client_id;
		businessFactory.createItem(newItem, business_id, function(){
			showItems();
		})
		self.newItem = {};
	}

	$("#updateMenuItem").on('show.bs.modal', function (e) {
		//get data-item attribute of the clicked element
		var itemObj = $(e.relatedTarget).data("item");
		var itemID = itemObj.id;
		var menu_item = itemObj.menu_item;
		var price = itemObj.price;

		//populate the textbox
		$(e.currentTarget).find('input[name="menu_item"]').val(menu_item);
		$(e.currentTarget).find('input[name="price"]').val(price);
		$(e.currentTarget).find('input[name="itemID"]').val(itemID);
		self.updatedItem = {};
		self.updatedItem.menu_item = menu_item;
		self.updatedItem.price = price;
		self.updatedItem.itemID = itemID;
	})

	this.updateMenuItem = function(updatedItem) {
		businessFactory.updateMenuItem(updatedItem, function() {
			$("#updateMenuItem").modal('hide');
			showItems();
			
			$timeout(function(){
				angular.forEach(self.items, function (item) {
					if (item._id == updatedItem.itemID) {
						item.updated = true;
					}
				})
			}, 400)
		})
	}

	this.deleteItem = function(itemID) {
		businessFactory.deleteItem(itemID, function() {
			showItems();
		})
	}
	this.showBusinessProfile = function(currentClient) {
		businessFactory.showCurrentBusiness(currentClient.client_id, function(data) {
			
			$scope.$parent.currentBiz = data;
			$location.path('/business_profile');
		})
	}
	this.updateBusinessProfile = function(business) {
		console.log(business);
		businessFactory.updateCurrentBusiness(business, function(data) {
			$scope.successfulUpdate = data.success;
		})
	}
})
















