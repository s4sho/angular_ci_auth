angular.module('app').controller('HomeCtrl', ['$scope', '$state', 'BooksFactory', function($scope, $state, BooksFactory){
	
	BooksFactory.get(function(data)
	{
		$scope.books = data.response;
	});
	
	$scope.remove = function(id)
	{
		console.log("inside remove function; " + "deleting the book with id=" + id);

		BooksFactory.delete({id:id}).$promise.then(function(data)
		{
			if(data.response)
			{
				$state.reload();
			}
		})

	}
	
}]);