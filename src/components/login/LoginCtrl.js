angular.module('app').controller('LoginCtrl', ['$scope', 'LoginFactory', '$location', '$state', function($scope, LoginFactory, $location, $state){
		
	$scope.login = function(){
		console.log($scope.user);
		LoginFactory.login($scope.user)
		.then(function(data){
			console.log(data);
			if(data.status == "logged_in"){
				//$location.url("/home");
				localStorage.setItem('booksUser', data.user);
				$state.go('home');
			}
			else {
				alert(data.message);
			}
		},
		function(msg, status){
			console.log(msg);
			//show alert
			alert("Server error");
		});
	}
	
	$scope.logout = function(){
		//alert("logginout");
		LoginFactory.logout()
		.then(function(data){
			//remove from local storage
			localStorage.removeItem('booksUser')
			$state.go('login')
		},
		function(msg, status){
			alert("Server error");
		});
	}
	
}]);


