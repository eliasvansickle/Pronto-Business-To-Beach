var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	type: String,
	name: String, 
	email: {type: String},
	cell_phone: {type: Number},
	password: String,
	passconf: String,
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date}
})

var businessSchema = new mongoose.Schema({
	type: String,
	business_name: String,
	email: String,
	phone: Number,
	password: String,
	street_address: String,
	city: String,
	state: String,
	zip_code: Number,
	status: String,
	image: String,
	menu: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date}
})

var menuSchema = new mongoose.Schema({
	menu_item: {type: String, required: true},
	price: {type: Number, required: true},
	_business: {type: Schema.ObjectId, req: 'Business'},
	_order: {type: Schema.ObjectId, req: 'Order'},
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date}
})

var orderSchema = new mongoose.Schema({
	total_price: Number,
	premium: Number,
	_user: {type: Schema.ObjectId, req: 'User'},
	_business: {type: Schema.ObjectId, req: 'Business'},
	ordered_items: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
	created_at: Date
})

var taskforceSchema = new mongoose.Schema({
	type: String,
	first_name: String,
	last_name: String,
	email: String,
	cell_phone: Number,
	password: String,
	status: String,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date}
})


mongoose.model('Order', orderSchema);

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

mongoose.model('Menu', menuSchema);

mongoose.model('Taskforce', taskforceSchema);
taskforceSchema.path('first_name').required(true, 'First Name is required');
taskforceSchema.path('last_name').required(true, 'Last Name is required');
taskforceSchema.path('email').required(true, 'Email is required');
taskforceSchema.path('cell_phone').required(true, 'Cell Phone Number is required');
taskforceSchema.path('password').required(true, 'Password is required');
















