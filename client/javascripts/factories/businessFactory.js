application.factory('businessFactory', function ($http) {
	return {
		updateMenuItem: function(itemID, updatedItem, callback) {
			$http.post("/business/item/update/" + itemID, updatedItem).success(function() {
				callback();
			})
		}
	}
})