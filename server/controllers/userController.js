var mongoose = require('mongoose');
var User = mongoose.model('User');
var Menu = mongoose.model("Menu");


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
	}

}
module.exports = userController;