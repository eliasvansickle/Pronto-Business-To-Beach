var mongoose = require('mongoose');
var _ = require("underscore");
var User = mongoose.model('User');
var Menu = mongoose.model("Menu");
var Business = mongoose.model("Business");
var Order = mongoose.model("Order");
var Postmates = require('postmates');
var postmates = new Postmates('cus_KPvP3A7DsuwQqV', 'b27eba32-b529-433c-b852-a4b1df2e04ec');
var moment = require('moment');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_uhaOwUSTk0V3lzJF0IvkcBOJ");

userController = {
	pick_up_address: null,
	drop_off_address: null,
	quote_id: null,
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
			if(req.session.cart) {
				for (i in req.session.cart) {
					if(req.session.cart[i]._id == item._id) {
						req.session.cart[i].quantity += req.body.quantity;
						req.session.cart[i].total_price += req.body.quantity * item.price;
						res.json(req.session.cart);
						break;
					}
				}
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
	},
	charge: function(req, res) {
		var stripeToken = req.body.token.id;
		var total_amount = req.body.amount;

		var charge = stripe.charges.create({
			amount: total_amount,
			currency: "usd",
			source: stripeToken,
			description: "Example charge"
		}, function(err, charge) {
			if (err && err.type === 'StripeCardError') {
			    console.log('STRIPE CARD ERROR')
			}
			else {
				// console.log('successful charge', charge);
				res.json('done');
			}
		});
	},
	getDeliveryQuote: function(req, res) {
		var business_zip;
		var delivery;
		var pick_up_address;
		var drop_off_address = req.body.dropOffLocation;
		this.drop_off_address = drop_off_address;
		var self = this;


		Business.findOne({_id: req.body.businessIdForPickUp}, function(err, business) {
			if(err) {
				console.log('unable to find business');
			}
			else {
				pick_up_address = (business.street_address + ", " + business.city + ", " + business.state + " " + business.zip_code);
				self.pick_up_address = pick_up_address;
				getQuote();
			}
		})

		function getQuote() {

			delivery = {
				pickup_address: pick_up_address,
				dropoff_address: drop_off_address
			};

			postmates.quote(delivery, function(err, quote) {
				if(err) {
					console.log('Error', err);
				}
				else {
					self.quote_id = quote.body.id;
					res.json(quote.body);
				}
			})
		}	
	},
	createDelivery: function(req, res) {
		var business_name;
		var business_phone_number;
		var user_phone_number;
		var user_name = req.session.name;
		var cart = req.session.cart;
		var delivery_description = [];
		var self = this;
		for(i in cart) {
			delivery_description.push(cart[i].menu_item);
		}
		delivery_description = delivery_description.join(', ');


		Business.findOne({_id: cart[0]._business}, function(err, business) {
			business_name = business.business_name;
			business_phone_number = formatPhoneNumber(business.phone);
		})

		User.findOne({_id: req.session._id}, function(err, user) {
			user_phone_number = formatPhoneNumber(user.cell_phone);
			initializeDelivery();
		})

		function formatPhoneNumber(num) {
			num = num.toString();
			arr = [];
			arr.push(num.slice(0,3));
			arr.push('-');
			arr.push(num.slice(3,6));
			arr.push('-');
			arr.push(num.slice(6,10));
			str = arr.join("");
			str = str.valueOf();
			return str;
		}

		function initializeDelivery() {

			var delivery = {
					manifest: delivery_description,
					pickup_name: business_name,
					pickup_address: self.pick_up_address,
					pickup_phone_number: business_phone_number,
					pickup_business_name: business_name,
					pickup_notes: "Optional note",
					dropoff_name: user_name,
					dropoff_address: self.drop_off_address,
					dropoff_phone_number: user_phone_number,
					dropoff_business_name: "Optional Dropoff Business Name, Inc.",
					dropoff_notes: "Optional note to ring the bell",
					quote_id: self.quote_id
				};
				console.log(delivery);

			postmates.new(delivery, function(err, delivery) {
				req.session.cart = [];
				res.json('delivery', delivery.body);
			});
		}
	}	
}

module.exports = userController;
















