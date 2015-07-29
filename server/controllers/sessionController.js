var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Taskforce = mongoose.model('Taskforce');
var User = mongoose.model('User');

sessionController = {
	login: function(req, res) {
		var fail = 0;
		var client = {};

		User.findOne(req.body, function(err, user) {
			if(err) {
				console.log("Error", err);
			}
			else {
				if(user != null) {
					client = user;
					setSession(client);
					res.json(user);
				}
				fail++;
			}
		})

		Business.findOne({email: req.body.email, password: req.body.password, status: 'active'}, function(err, business) {
			if(err) {
				console.log("Error", err);
			}
			else {
				if (business != null) {
					client = business;
					setSession(client);
					res.json(business);
				}
				fail++;
			}
		})

		Taskforce.findOne({email: req.body.email, password: req.body.password, status: 'active'}, function(err, taskforce) {
			if(err) {
				console.log("Error", err);
			}
			else {
				if(taskforce != null) {
					client = taskforce;
					setSession(client);
					res.json(taskforce);
				}
				fail++;
				
				if (fail == 3) {
					res.json({login_fail: 'Invalid Log In Credentials'});
				}
			}
		})

		function setSession(client) {
			req.session._id = client._id;
			req.session.email = client.email;
			req.session.name = client.name;
			req.session.type = client.type;
			console.log("SESSION SET HERE", req.session);
		}

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