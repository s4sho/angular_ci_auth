angular.module('app').factory('LoginFactory', ["$resource", function($resource){
	
    return $resource(
        "http://localhost/codeigniter/restangularjs/login/:id", 
        {id:"@_id"}, 
	{update: {method: "PUT", params: {id: "@_id"}}}
    );
	
}]);


