var application = angular.module('application', ['ngRoute', 'ui.bootstrap']);


application.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: './partials/landing.html'
	})
	.when('/login', {
		templateUrl: './partials/login.html',
		controller: 'authenticationController'
	})
	.when('/signup', {
		templateUrl: './partials/signup.html'
	})
	.when('/user_signup', {
		templateUrl: './partials/user_signup.html',
		controller: 'authenticationController'
	})
	.when('/taskforce_signup', {
		templateUrl: './partials/taskforce_signup.html',
		controller: 'authenticationController'
	})
	.when('/business_signup', {
		templateUrl: './partials/business_signup.html',
		controller: 'authenticationController'
	})
	.when('/user_dashboard', {
		templateUrl: './partials/user_dashboard.html',
		controller: 'userController',
		controllerAs: 'user'
	})
	.when('/menu', {
		templateUrl: './partials/menu.html',
		controller: 'userController',
		controllerAs: 'user'
	})
	.when('/checkout', {
		templateUrl: './partials/checkout.html',
		controller: 'userController',
		controllerAs: 'user'
	})
	.when('/successful_order', {
		templateUrl: './partials/successful_order.html'
	})
	.when('/business_current_orders', {
		templateUrl: './partials/business_current_orders.html',
		controller: 'businessController'
	})
	.when('/business_order_history', {
		templateUrl: './partials/business_order_history.html',
		controller: 'businessController'
	})
	.when('/admin_users', {
		templateUrl: './partials/admin_users.html',
		controller: 'adminUsersController'
	})
	.when('/admin_business', {
		templateUrl: './partials/admin_business.html',
		controller: 'adminBusinessController'
	})
	.when('/admin_taskforce', {
		templateUrl: './partials/admin_taskforce.html',
		controller: 'adminTaskforceController'
	})
	.when('/update_user_profile', {
		templateUrl: './partials/update_user_profile.html',
		controller: 'adminUpdateUserController'
	})
	.when('/update_business_profile', {
		templateUrl: './partials/update_business_profile.html',
		controller: 'adminUpdateBusinessController'
	})
	.when('/update_taskforce_profile', {
		templateUrl: './partials/update_taskforce_profile.html',
		controller: 'adminUpdateTaskforceController'
	})
	.when('/business_menu_table', {
		templateUrl: './partials/business_menu_table.html',
		controller: 'businessController',
		controllerAs: 'business'
	})
	.when('/taskforce_receive_orders', {
		templateUrl: './partials/taskforce_receive_orders.html'
	})
	.when('/business_profile', {
		templateUrl: './partials/business_profile.html',
		controller: 'businessController',
		controllerAs: 'biz'
	})
	.otherwise({
		redirectTo: '/'
	})
})






























