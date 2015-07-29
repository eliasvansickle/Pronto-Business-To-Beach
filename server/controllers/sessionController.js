var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Taskforce = mongoose.model('Taskforce');
var User = mongoose.model('User');

sessionController = {
	login: function(req, res) {
		var client = {};

		User.findOne(req.body, function (err, user) {
			if(err) {
				console.log("Error", err);
			}
			else {
				if(user != null) {
					client = user;
					setSession(client);
					res.json(user);
				}
			}
		})

		Business.findOne({email: req.body.email, password: req.body.password}, function (err, business) {
			if(err) {
				console.log("Error", err);
			}
			else {
				if (business != null) {
					if (business.status == 'active') {
						client = business;
						setSession(client);
						res.json(business);
					}
					else if (business.status == "inactive") {
						res.json({login_fail: 'Your account has not been activated.'});
					}
				}
			}
		})

		Taskforce.findOne({email: req.body.email, password: req.body.password}, function (err, taskforce) {
			if(err) {
				console.log("Error", err);
			}
			else {
				if(taskforce != null) {
					if (taskforce.status == 'active') {
						client = taskforce;
						setSession(client);
						res.json(taskforce);
					}
					else if (taskforce.status == "inactive") {
						res.json({login_fail: 'Your account has not been activated.'});
					}
				}
				res.json({login_fail: 'Invalid Log In Credentials'});
			}
		})

		function setSession(client) {
			req.session._id = client._id;
			req.session.email = client.email;
			req.session.name = client.name;
			req.session.type = client.type;
		}

	},

	checkSession: function(req, res) {
		if(!req.session.type) {
			console.log('no session');
			res.json({ status: false });
		}
		else {
			res.json({ status: true, type: req.session.type });
			console.log(req.session, 'session!!!');
		}
		res.end('done');
	},

	logOut: function (req, res) {
		req.session.destroy(function (err) {
			console.log("controller here SESSION DESTROYED");
			console.log(req.session);
			res.json("done");
		});
	}
}

module.exports = sessionController;