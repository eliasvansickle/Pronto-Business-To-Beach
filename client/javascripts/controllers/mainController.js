application.controller('mainController', function(authenticationFactory) {
	var checkSession = function() {
		authenticationFactory.checkSession(function(data) {
			console.log(data,'callback here');
		})
	}

	checkSession();
})