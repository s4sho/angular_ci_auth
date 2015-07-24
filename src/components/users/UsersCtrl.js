angular.module('app').controller('UsersCtrl', ['$scope', 'RegisterFactory', function($scope, RegisterFactory){
	
    RegisterFactory.get(function(data)
    {
        $scope.users = data.response;
    });
	
}]);