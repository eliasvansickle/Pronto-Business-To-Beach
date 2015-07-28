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
	}
}

module.exports = businessController;