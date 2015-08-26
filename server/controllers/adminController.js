var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

adminController = {
	sendEmail: function(req, res) {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'prontobiz2beach@gmail.com',
				pass: 'prontisimo'
			}
		});

		var mailOptions = {
			to: req.body.to,
			subject: req.body.subject,
			text: req.body.content
		};

		transporter.sendMail(mailOptions, function(err, info) {
			if(err) {
				console.log('ERR', error);
			}
			else {
				console.log('successfully sent email');
				res.json({sucess: 'successfully sent email'});
			}
		})
	}
};
module.exports = adminController;