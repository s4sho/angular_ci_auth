angular.module('app').controller('EditCtrl', ['$scope', '$stateParams', 'BooksFactory', function($scope, $stateParams, BooksFactory){
	
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