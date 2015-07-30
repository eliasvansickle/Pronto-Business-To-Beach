var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
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