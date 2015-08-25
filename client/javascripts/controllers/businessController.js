application.controller('businessController', function ($timeout, $location, $scope, businessFactory, $socket) {

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
	this.updateBusinessProfile = function(business) {
		businessFactory.updateCurrentBusiness(business, function(data) {
			$scope.successfulUpdate = data.success;
		})
	}

	function parseDate(input) {
			var parts = input.match(/(\d+)/g);
		    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
		    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
		}
	this.cleanUpOrder = function(data) {
		var arr = [];
		var obj = {};
		for(i in data.orders) {
			for(j in data.orders[i].ordered_items) {
				var item = data.orders[i].ordered_items[j].menu_item;
				var price = data.orders[i].ordered_items[j].price;
				var quantity = data.orders[i].quantity[j];
				var total_price = price * quantity;
				var created_at = data.orders[i].ordered_items[j].created_at;
				// created_at = parseDate(created_at).getMonth() + '/' + parseDate(created_at).getDate() + '/' + parseDate(created_at).getFullYear();

				obj['item'] = item;
				obj['price'] = price;
				obj['quantity'] = quantity;
				obj['total_price'] = total_price;
				obj['created_at'] = created_at;
				arr.push(obj);
				obj = {};
			}
		}
		return arr;
	}
	
	businessFactory.getOrderHistory(function(data) {
		$scope.orderHistory = self.cleanUpOrder(data);
	})

})
















