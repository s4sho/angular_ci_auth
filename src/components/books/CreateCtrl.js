angular.module('app').controller('CreateCtrl', ['$scope', '$stateParams', 'BooksFactory', '$state', function($scope, $stateParams, BooksFactory, $state){
	
	if(localStorage.getItem('booksUser') == null){
			$state.go('login');
	}
	
	$scope.settings = {
		pageTitle: "Add book",
		action: "Add"
	};
	
	$scope.book = {
		title: "",
		author: "",
		sinopsis: "",
		isbn: ""
	};
	
	$scope.submit = function()
	{
		BooksFactory.save({book:$scope.book}).$promise.then(function(data)
		{
			if(data.response)
			{
				angular.copy({}, $scope.book);
				$scope.settings.success = "The book was successfully added";
			}
		});
	}
	
}]);