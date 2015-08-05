angular.module('app').factory('BooksFactory', ["$resource", function($resource){
	
	return $resource(
		"http://localhost/freelancer/maja/restangularjs/index.php/books/:id", 
		{id:"@_id"}, 
		{update: {method: "PUT", params: {id: "@_id"}}}
	)
	
}]);