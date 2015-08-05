angular.module('app').controller('EditCtrl', ['$scope', '$stateParams', 'BooksFactory', '$state', function($scope, $stateParams, BooksFactory, $state){
	
	if(localStorage.getItem('booksUser') == null){
			$state.go('login');
	}
	
	$scope.settings = {
		pageTitle: "Edit book",
		action: "Edit"
	};
	
	var id = $stateParams.id;
	
	BooksFactory.get({id:id}, function(data)
	{
		$scope.book = data.response;	
	});
	
	$scope.submit = function()
	{
		BooksFactory.update({id:$scope.book.id},{book:$scope.book}, function(data)
		{
			$scope.settings.success = "The book was successfully edited";
		});
	};
	
}]);