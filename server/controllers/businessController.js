var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Menu = mongoose.model('Menu');
var moment = require('moment');

businessController = {
	createBusiness: function(req, res) {
		var business = new Business({
			type: 'business',
			business_name: req.body.business_name,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
			street_address: req.body.street_address,
			city: req.body.city,
			state: req.body.state,
			zip_code: req.body.zip_code,
			status: 'inactive',
			created_at: Date()
		})

		business.save(function(err, data) {
			if(err) {
				console.log("ERROR", err);
				res.json({biz_reg_errors: err.errors});
			}
			else {
				res.json({biz_reg_success: 'Registration successful. A representative will contact you shortly.'});
			}
		})
	},
	showAllBusinesses: function(req, res) {
		Business.find({}, function(err, businesses) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json(businesses);
			}
		})
	},
	showIndividualBusiness: function(req, res) {
		Business.findOne({_id: req.params.id}, function(err, business) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json(business);
			}
		})
	},
	updateIndividualBusiness: function(req, res) {
		Business.update({_id: req.body._id}, {
			business_name: req.body.business_name,
			email: req.body.email,
			phone: req.body.phone,
			street_address: req.body.street_address,
			city: req.body.city,
			state: req.body.state,
			zip_code: req.body.zip_code,
			status: req.body.status,
			updated_at: Date()
		}, 
		function(err, business) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json({success: 'Update Sucessful'});
			}
		})
	},
	deleteBusiness: function(req, res) {
		Business.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log('ERROR', err);
			}
			else {
				res.json({message: 'deleted business'});
			}
		})
	},
	updateMenuItem: function(req, res) {
		Menu.update( { _id: req.params.id },
					 { 
					 	$set: { menu_item: req.body.menu_item,
					 			price: req.body.price }
					 },
					 function (err) {
					 	if (err) {
					 		console.log("ERROR", err);
					 	}
					 	else {
					 		res.json(true);
					 	}
					 }
					)
	},
	createNewMenuItem: function(req, res) {
		Business.findOne({_id: req.params.id}, function(err, business) {
			var menu = new Menu({
				menu_item: req.body.item,
				price: req.body.price,
				_business: business._id,
				created_at: Date()
			})
			business.menu.push(menu);

			menu.save(function(err) {
				business.save(function(err) {
					if(err) {
						console.log('ERROR', err);
					}
					else {
						res.json({success: 'successfully added menu item'});

					}
				})
			})
		})
	},
	showMenuItems: function(req, res) {
		Business
		.findOne({_id: req.params.id})
		.populate('menu')
		.exec(function(err, business) {
			if(err) {
				console.log('ERR', err);
			}
			else {
				res.json(business);
			}
		})
	},
	deleteItem: function(req, res) {
		Menu.find({_id: req.params.id}).remove().exec();
		res.json("done");
	},
	showBusinessProfile: function(req, res) {
		Business.findOne({_id: req.params.id}, function(err, business) {
			if(err) {
				console.log('ERROR', err);
			}
			else {
				res.json(business);
			}
		})
	},
	updateBusinessProfile: function(req, res) {
		Business.update({_id: req.params.id}, {
			$set: {
				business_name: req.body.business_name,
				email: req.body.email,
				phone: req.body.phone,
				street_address: req.body.street_address,
				city: req.body.city,
				state: req.body.state,
				zip_code: req.body.zip_code,
				updated_at: Date()
			}
		}, 
		function(err) {
			if(err) {
				console.log('ERROR', err);
			}
			else {
				res.json({success: 'Successfully Updated Business'});
			}

		})
	},
	getOrderHistory: function(req, res) {
		Business
		.findOne({_id: req.session._id})
		.populate('orders')
		.exec(function(err, business) {
			if(err) {
				console.log('ERR', err);
			}
			else {
				res.json('done', business);
			}	
		})
	}
}

module.exports = businessController;
































