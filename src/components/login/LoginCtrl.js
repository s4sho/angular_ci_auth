angular.module('app').controller('LoginCtrl', ['$scope', 'LoginFactory', function($scope, LoginFactory){
	
    LoginFactory.get(function(data)
    {
        $scope.loginUser = data.response;
    });
	
}]);


