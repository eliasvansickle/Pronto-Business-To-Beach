var mongoose = require('mongoose');
var Business = mongoose.model('Business');

businessController = {
	createBusiness: function(req, res) {
		var business = new Business({
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
				console.log(businesses);
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
				console.log('successfully deleted business');
				res.json({message: 'deleted business'});
			}
		})
	}
}

module.exports = businessController;
































