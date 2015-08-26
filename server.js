var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var stripe = require("stripe")("sk_test_uhaOwUSTk0V3lzJF0IvkcBOJ");
var Postmates = require('postmates');
var postmates = new Postmates('cus_KPvP3A7DsuwQqV', 'b27eba32-b529-433c-b852-a4b1df2e04ec');
var app = express();
var _ = require("underscore");


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
var io = require('socket.io')(server);

SocketArray = [];
io.sockets.on('connection', function(socket) {
	console.log('sockets are on!');
	socket.on('order_added', function(data) {
		SocketArray.push(data);
		io.emit('order_added_check', {currentOrders: SocketArray});
	})
	socket.on('deleteCurrentOrder', function(data) {
		for(var i = 0; i < SocketArray.length; i++) {
			for(var j = 0; j < SocketArray[i].ordered_items.length; j ++) {
				if(SocketArray[i].ordered_items[j].created_at == data.created_at) {
					console.log('they are equal!');
					SocketArray[i].ordered_items.splice(j,1);
					io.emit('order_added_check', {currentOrders: SocketArray});
					break;
				}
				else {
					console.log('no match!');
				}
			}
		}
	})
})