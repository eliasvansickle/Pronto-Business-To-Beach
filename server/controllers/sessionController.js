var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Taskforce = mongoose.model('Taskforce');
var User = mongoose.model('User');

sessionController = {
	login: function(req, res) {
		User.findOne(req.body, function(err, user) {
			if(err) {
				console.log("Error", err);
			}
			else {
				if(user != null) {
					console.log(user);
					req.session._id = user._id;
					req.session.email = user.email;
					req.session.name = user.name;
					req.session.type = user.type;
					res.json(user);
				}
				else {
					console.log('user not found');
					Business.findOne({email: req.body.email, password: req.body.password, status: 'active'}, function(err, business) {
						if(err) {
							console.log("Error", err);
						}
						else {
							if(business != null) {
								console.log(business);
								
								res.json(business);
							}
							else {
								console.log('business not found');
								Taskforce.findOne({email: req.body.email, password: req.body.password, status: 'active'}, function(err, taskforce) {
									if(err) {
										console.log("Error", err);
									}
									else {
										if(taskforce != null) {
											console.log(taskforce);
											res.json(taskforce);
										}
										else {
											console.log('taskforce member not found');
											res.json({login_fail: 'Invalid Log In Credentials'});

										}
									}

								})
							}
						}
					})
				}
			}
		})
	},
	checkSession: function(req, res) {
		if(req.session.type) {
			console.log(req.session, 'session!!!');
		}
		else {
			console.log('no session');
		}
		res.end('done');
	}
}

module.exports = sessionController;