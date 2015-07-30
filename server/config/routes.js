module.exports = function(app) {
	var businessController = require('../controllers/businessController.js');
	var taskforceController = require('../controllers/taskforceController.js');
	var userController = require('../controllers/userController.js');
	var sessionController = require('../controllers/sessionController.js');

	app.post('/user/create', function(req, res) {
		userController.createUser(req, res);
	})
	app.post('/business/create', function(req, res) {
		businessController.createBusiness(req, res);
	})
	app.post('/taskforce/create', function(req, res) {
		taskforceController.createTaskforce(req, res);
	})
	app.post('/login', function(req, res) {
		sessionController.login(req, res);
	})
	app.get('/users', function(req, res) {
		userController.showAllUsers(req, res);
	})
	app.get('/businesses', function(req, res) {
		businessController.showAllBusinesses(req, res);
	})
	app.get('/taskforceMembers', function(req, res) {
		taskforceController.showAllTaskforceMembers(req, res);
	})
	app.get('/userProfile/:id', function(req, res) {
		userController.showIndividualUser(req, res);
	})
	app.get('/businessProfile/:id', function(req, res) {
		businessController.showIndividualBusiness(req, res);
	})
	app.get('/taskforceProfile/:id', function(req, res) {
		taskforceController.showIndividualTaskforce(req, res);
	})
	app.post('/taskforceProfile/update', function(req, res) {
		taskforceController.updateIndividualTaskforce(req, res);
	})
	app.post('/businessProfile/update', function(req, res) {
		businessController.updateIndividualBusiness(req, res);
	})
	app.post('/userProfile/update', function(req, res) {
		userController.updateIndividualUser(req, res);
	})
	app.post('/users/delete/:id', function(req, res) {
		userController.deleteUser(req, res);
	})
	app.post('/business/delete/:id', function(req, res) {
		businessController.deleteBusiness(req, res);
	})
	app.post('/taskforce/delete/:id', function(req, res) {
		taskforceController.deleteTaskforce(req, res);
	})
	app.get('/session/check', function(req, res) {
		sessionController.checkSession(req, res);
	})
	app.get('/session/logOut', function(req, res) {
		sessionController.logOut(req, res);
	})
	app.post('/business/item/update/:id', function (req, res) {
		businessController.updateMenuItem(req, res);
	})
	app.post('/business/item/new/:id', function(req, res) {
		businessController.createNewMenuItem(req, res);
	})
	app.get('/business/items/show/:id', function(req, res) {
		businessController.showMenuItems(req, res);
	})
	app.delete('/business/item/delete/:id', function(req, res) {
		businessController.deleteItem(req, res);
	})
	app.get('/business/profile/show/:id', function(req, res) {
		businessController.showBusinessProfile(req, res);
	})
	app.post('/business/profile/update/:id', function(req, res) {
		businessController.updateBusinessProfile(req, res);
	})
	app.get('/cart/show', function(req, res) {
		userController.showCartItems(req, res);
	})
}

















