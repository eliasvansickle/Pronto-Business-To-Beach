var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
	validate({
		validator: 'isAlpha',
		message: 'Name may only contiain alphabetic characters'
	})
];
var businessNameValidator = [
	validate({
		validator: 'isAlpha',
		message: 'Business Name may only contiain alphabetic characters'
	})
];

var userSchema = new mongoose.Schema({
	name: {type: String, validate: nameValidator}, 
	email: {type: String},
	cell_phone: {type: Number},
	password: String,
	passconf: String,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date}
})

var businessSchema = new mongoose.Schema({
	business_name: {type: String, validate: businessNameValidator},
	email: String,
	phone: Number,
	password: String,
	street_address: String,
	city: String,
	state: String,
	zip_code: Number,
	status: String,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date}
})

var taskforceSchema = new mongoose.Schema({
	first_name: {type: String, validate: nameValidator},
	last_name: String,
	email: String,
	cell_phone: Number,
	password: String,
	status: String,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date}
})

mongoose.model('User', userSchema);
userSchema.path('name').required(true, 'Name is required');
userSchema.path('email').required(true, 'Email is required');
userSchema.path('cell_phone').required(true, 'Cell Phone Number is required');
userSchema.path('password').required(true, 'Password is required');

mongoose.model('Business', businessSchema);
businessSchema.path('business_name').required(true, 'Business Name is required');
businessSchema.path('email').required(true, 'Email is required');
businessSchema.path('phone').required(true, 'Phone Number is required');
businessSchema.path('password').required(true, 'Password is required');
businessSchema.path('street_address').required(true, 'Street Address is required');
businessSchema.path('city').required(true, 'City is required');
businessSchema.path('state').required(true, 'State is required');
businessSchema.path('zip_code').required(true, 'Zip Code is required');

mongoose.model('Taskforce', taskforceSchema);
taskforceSchema.path('first_name').required(true, 'First Name is required');
taskforceSchema.path('last_name').required(true, 'Last Name is required');
taskforceSchema.path('email').required(true, 'Email is required');
taskforceSchema.path('cell_phone').required(true, 'Cell Phone Number is required');
taskforceSchema.path('password').required(true, 'Password is required');
















