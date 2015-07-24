angular.module('app').factory('BooksFactory', ["$resource", function($resource){
	
	return $resource(
		"http://localhost/codeigniter/restangularjs/books/:id", 
		{id:"@_id"}, 
		{update: {method: "PUT", params: {id: "@_id"}}}
	)
	
}]);