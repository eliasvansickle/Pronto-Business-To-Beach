var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var stripe = require("stripe")("sk_test_uhaOwUSTk0V3lzJF0IvkcBOJ");
var Postmates = require('postmates');
var postmates = new Postmates('cus_KPvP3A7DsuwQqV', 'b27eba32-b529-433c-b852-a4b1df2e04ec');
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.use(session({
	secret: 'secret_here',
	resave: false,
	saveUninitialized: true,
	cookie  : { maxAge  : new Date(Date.now() + (60 * 1000 * 30)) }
}))

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);



var server = app.listen(8000);