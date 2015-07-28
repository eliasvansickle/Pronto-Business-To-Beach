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
}
