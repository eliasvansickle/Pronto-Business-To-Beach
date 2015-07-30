application.factory('businessFactory', function ($http) {
	return {
		updateMenuItem: function(updatedItem, callback) {
			$http.post("/business/item/update/" + updatedItem.itemID, updatedItem).success(function() {
				callback();
			})
		},
		createItem: function(newItem, business_id, callback) {
			$http.post('/business/item/new/'+business_id, newItem).success(function(){
				callback();
			})
		},
		showItems: function(business_id, callback) {
			$http.get('/business/items/show/'+business_id).success(function (data) {
				callback(data);
			})
		},
		deleteItem: function(itemID, callback) {
			$http.delete("/business/item/delete/" + itemID).success(function() {
				callback();
			})
		}
	}
})