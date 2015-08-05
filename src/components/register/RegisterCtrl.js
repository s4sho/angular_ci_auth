angular.module('app').controller('RegisterCtrl', ['$scope', 'RegisterFactory', function($scope, RegisterFactory){
	
	$scope.submit = function(user) {
		console.log('Username: ' + user.username + ' Email: ' + user.email);
                
        RegisterFactory.save({user:$scope.user}).$promise.then(function(data)
		{
			if(data.status == "invalid" && data.message.length > 0){
				alert(data.message);
				return;
			}
			if(data.response)
			{
				angular.copy({}, $scope.user);
				$scope.settings.success = "The user was successfully added";
			}
		});
	};
	
}]);