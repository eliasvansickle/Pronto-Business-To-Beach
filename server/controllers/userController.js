var mongoose = require('mongoose');
var _ = require("underscore");
var User = mongoose.model('User');
var Menu = mongoose.model("Menu");
var Business = mongoose.model("Business");
var Order = mongoose.model("Order");


userController = {
	createUser: function(req, res) {
		user = new User({
			type: 'user',
			name: req.body.name,
			email: req.body.email,
			cell_phone: req.body.cell_phone,
			password: req.body.password,
			passconf: req.body.passconf,
			created_at: Date()
		})
		user.save(function(err, data) {
			if(err) {
				console.log("ERROR", err);
				res.json({user_reg_errors: err.errors});
			}
			else {
				res.json({user_reg_success: 'Thank you for registering. Please Log In.'})
			}

		})
	},
	showAllUsers: function(req, res) {
		User.find({}, function(err, users) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json(users);
			}
		})
	},
	showIndividualUser: function(req, res) {
		User.findOne({_id: req.params.id}, function(err, user) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json(user);
			}
		})
	},
	updateIndividualUser: function(req, res) {
		console.log(req.body, 'server');
		User.update({_id: req.body._id}, {
			type: req.body.type,
			name: req.body.name,
			email: req.body.email,
			cell_phone: req.body.cell_phone,
			updated_at: Date()
		}, 
		function(err, user) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json({success: 'Update Sucessful'});
			}
		})
	},
	deleteUser: function(req, res) {
		console.log(req.params.id, 'server');
		User.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log("Error", err);
			}
			else {
				console.log('user successfully deleted.');
				res.json({message: 'deleted!'});
			}
		})
	},
	showCartItems: function(req, res) {
		res.json(req.session);
	},
	addToCart: function(req, res) {
		Menu.findOne({_id: req.params.id}, function (err, item) {
			if (!req.session.cart) {
				req.session.cart = [];
			}
			item.total_price = req.body.quantity * item.price;
			item.quantity = req.body.quantity;
			req.session.cart.push(item);
			res.json(req.session.cart);
		}).lean()
	},
	updateCart: function(req, res) {
		req.session.cart.forEach(function(item) {
			if(item._id == req.params.id) {
				item.quantity = req.body.quantity,
				item.updated_at = new Date
			}
		})
		res.json(true);
	},
	deleteCartItem: function(req, res) {
		req.session.cart.forEach(function(item) {
			if(item._id == req.params.id) {
				var index = req.session.cart.indexOf(item);
				req.session.cart.splice(index, 1);
				res.json(true);
			}
		})
	},
	checkOut: function(req, res) {
		var created_at_new = Number(Date.now());
		var total_amount = req.body.total_amount;
		var sessionCart = req.session.cart;

		var item = sessionCart[0];

		
		Business.findOne({_id: item._business}, function (err, business) {
			// ========== CREATE NEW ORDER ==========
			var order = new Order;
			order.itemPrices.push(item.total_price);
			order.total_amount = total_amount;
			order.quantity.push(item.quantity);
			order._user = req.session._id;
			order._business = item._business;
			order.created_at = created_at_new;

			// ========= USER ===========
			User.findOne({_id: req.session._id}, function (err, user) {
				user.orders.push(order);
				user.save(function (err) {
					if (err) console.log(err);
				})
			})

			// ========= MENU ===========
			Menu.findOne({_id: item._id}, function (err, menuItem) {
				menuItem.orders.push(order);
				order.ordered_items.push(menuItem);
				menuItem.save(function (err) {
					order.save(function (err) {
						if (err) console.log(err);
					})
				})
			})

			// ========= BUSINESS ===========
			business.orders.push(order);
			business.save(function (err) {
				order.save(function (err, order) {
					if (err) {
						console.log(err);
					} else {
						checkForMoreItems(order._id);
						res.json("done");
					}
				})
			})
		})
		function checkForMoreItems(order_id) {		
			if(sessionCart.length > 1) {
				for (i = 1; i < sessionCart.length; i++) {
					item = sessionCart[i];	
					Order.findOne({_id: order_id}, function (err, order) {
						if (order) {
							order.itemPrices.push(item.total_price);
							order.quantity.push(item.quantity);

							// ========= MENU ===========
							Menu.findOne({_id: item._id}, function (err, menuItem) {
								menuItem.orders.push(order);
								order.ordered_items.push(menuItem);
								menuItem.save(function (err) {
									order.save(function (err) {
										if (err) {
											console.log(err);
										}
										else {
											console.log("===== ORDER ADDED =====");
											res.json("done");
										}
									})
								})
							})
						} 
					})
				}
			}
		}
	}	
}

module.exports = userController;