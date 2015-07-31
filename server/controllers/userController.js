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
	checkOut: function(req, res) {
		console.log(req.session);
		var created_at_new = Number(Date.now());
		var total_amount = req.body.total_amount;
		var sessionCart = req.session.cart;

		// sessionCart.forEach(function (orderInCart) {
		// 	var index = sessionCart.indexOf(orderInCart);
		// 	Business.findOne({_id: orderInCart._business}, function (err, business) {
		// 		var order = new Order;
		// 		order.total_price = orderInCart.total_price;
		// 		order.menu_item = orderInCart.menu_item;
		// 		order.quantity = orderInCart.quantity;
		// 		order._user = req.session._id;
		// 		order._business = orderInCart._business;
		// 		order.created_at = created_at;
		// 		User.findOne({_id: req.session._id}, function (err, user) {
		// 			user.orders.push(order);
		// 			user.save(function (err) {
		// 				if (err) console.log(err);
		// 			})
		// 		})
		// 		Menu.findOne({_id: orderInCart._id}, function (err, menuItem) {
		// 			menuItem.orders.push(order);
		// 			order.ordered_items.push(menuItem);
		// 			menuItem.save(function (err) {
		// 				order.save(function (err) {
		// 					if (err) console.log(err);
		// 				})
		// 			})
		// 		})
		// 		business.orders.push(order);
		// 		business.save(function (err) {
		// 			order.save(function (err) {
		// 				if (err) {
		// 					console.log(err);
		// 				} else {
		// 					console.log("===== ORDER ADDED =====");
		// 					sessionCart.splice(index, 1);
		// 					console.log(req.session);
		// 					res.json("done");		
		// 				}
		// 			})
		// 		})
		// 	})
		// })

		// =========== TESTING ================
		// =========== FIND UNIQUE BUSINESSES =============
		var businessesList = _.uniq(sessionCart, function (business) {
			return business._business;
		})

		// console.log(businessesList);

		// =========== ARRAY OF UNIQUE BUSINESS IDS ================
		var businessIDs = [];

		_.each(businessesList, function (business) {
			businessIDs.push(business._business);
		})

		// console.log("List of IDs", businessIDs);

		businessIDs.forEach(function (businessID) {
			// FIND ALL ITEMS ASSOCIATED WITH A CERTAIN BUSINESS
			var itemsInCart = _.where(sessionCart, {_business: businessID});
			// var itemsInCart = businesses;
			itemsInCart.forEach(function (item) {
				Order.findOne({_business: item._business, _user: req.session._id, created_at: created_at_new}, function (err, order) {
					// console.log("TIME", 'ISODate("' + created_at.toISOString() + '")');
					if (order) {
						console.log("DBTIME",order.created_at);
						order.itemPrices.push(item.total_price);
						order.quantity.push(item.quantity);

						// ========= MENU ===========
						Menu.findOne({_id: item._id}, function (err, menuItem) {
							menuItem.orders.push(order);
							order.ordered_items.push(menuItem);
							menuItem.save(function (err) {
								order.save(function (err) {
									if (err) console.log(err);
									res.json("done");
								})
							})
						})
					} else {
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
								order.save(function (err) {
									if (err) {
										console.log(err);
									} else {
										console.log("===== ORDER ADDED =====");
										// sessionCart.splice(index, 1);
										// console.log(req.session);
										res.json("done");
									}
								})
							})
						})
					}
				})
			})
		})
		// ====================================
	}
}
module.exports = userController;