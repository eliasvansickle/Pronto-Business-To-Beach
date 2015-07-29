var mongoose = require('mongoose');
var User = mongoose.model('User');

userController = {
	createUser: function(req, res) {
		user = new User({
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
	}

}
module.exports = userController;