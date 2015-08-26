application.controller('mainController', function ($scope, $location, authenticationFactory, businessFactory, $socket) {
	var self = this;
	$scope.currentBiz = {};
	this.currentBizId = null;

	$socket.on('order_added_check', function(data) {
		if(businessFactory.currentBusiness) {
			var currBizId = businessFactory.currentBusiness._id;
			var orders = data.currentOrders;
			var arr = [];
			for(i in orders) {
				var order = orders[i];
				if(order._business == currBizId) {
					for(j in order.ordered_items) {
						var obj = {};
						var item = order.ordered_items[j].menu_item;
						var price = order.ordered_items[j].price;
						var quantity = order.quantity[j];
						var total_price = price * quantity;
						var created_at = order.ordered_items[j].created_at;
						// created_at = parseDate(created_at).getMonth() + '/' + parseDate(created_at).getDate() + '/' + parseDate(created_at).getFullYear();

						obj['item'] = item;
						obj['price'] = price;
						obj['quantity'] = quantity;
						obj['total_price'] = total_price;
						obj['created_at'] = created_at;
						arr.push(obj);
					}
				}
			}
			$scope.currentOrders = arr;
			console.log(arr);
		}
	})

	function parseDate(input) {
			var parts = input.match(/(\d+)/g);
		    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
		    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
		}

	var checkSession = function() {
		authenticationFactory.checkSession(function(data) {
			if (data.status == false) {
				$location.path("/");
				self.user = false;
				self.business = false;
				self.taskforce = false;
				self.admin = false;
			}
			else {
				$scope.$broadcast('currentClient', {data});
				self.loggedIn = true;
				if (data.type == "user") {
					self.user = true;
				}
				if (data.type == "business") {
					self.business = true;
					this.currentBizId = data.client_id;
				}
				if (data.type == "taskforce") {
					self.taskforce = true;
				}
				if (data.type == "admin") {
					self.admin = true;
				}
			}
		})
	}

	checkSession();


	$scope.$on("checkSession", function (events, args) {
		checkSession();
	});

	this.logOut = function() {
		authenticationFactory.logOut(function() {
			self.loggedIn = false;
			self.location = null;
			checkSession();
		})
	}

	$scope.$on("locationChange", function (events, args) {
		self.location = args.location;
	})

	this.changeLocation = function(location) {
		self.location = location;
		$location.path("/" + location);
	}



	$scope.$on("cart", function (events, args) {
		self.cartQuantity = 0;
		if(args.cart) {
			angular.forEach(args.cart, function (item) {
				self.cartQuantity += item.quantity;
			})
		}
	})

	this.showBusinessProfile = function() {
		businessFactory.showCurrentBusiness(currentBizId, function(data) {
			$scope.currentBiz = data;
			$location.path('/business_profile');
		})
	}

	$scope.deleteCurrentOrder = function(order) {
		$socket.emit('deleteCurrentOrder', order);
	}

})







