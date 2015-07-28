var mongoose = require('mongoose');
var Taskforce = mongoose.model('Taskforce');

taskforceController = {
	createTaskforce: function(req, res) {
		var taskforce = new Taskforce({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			cell_phone: req.body.cell_phone,
			password: req.body.password,
			status: 'inactive',
			created_at: Date()
		})
		taskforce.save(function(err, data) {
			if(err) {
				console.log("ERROR", err);
				res.json({taskforce_reg_errors: err.errors});
			}
			else {
				res.json({taskforce_reg_success: 'Registration successful. A representative will contact you shortly.'})
			}
		})
	},
	showAllTaskforceMembers: function(req, res) {
		Taskforce.find({}, function(err, taskforce) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json(taskforce);
			}
		})
	},
	showIndividualTaskforce: function(req, res) {
		Taskforce.findOne({_id: req.params.id}, function(err, taskforce) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json(taskforce);
			}
		})
	},
	updateIndividualTaskforce: function(req, res) {
		Taskforce.update({_id: req.body._id}, {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			cell_phone: req.body.cell_phone,
			password: req.body.password,
			status: req.body.status,
			updated_at: Date()
		},
		function(err, taskforce) {
			if(err) {
				console.log("ERROR", err);
			}
			else {
				res.json({success: 'Update Sucessful'});
			}
		})
	}
}
module.exports = taskforceController;