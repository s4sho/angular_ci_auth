angular.module('app').factory('RegisterFactory', ["$resource", function($resource){
	
    return $resource(
        "http://localhost/freelancer/maja/restangularjs/index.php/register/:id", 
        {id:"@_id"}, 
	{update: {method: "PUT", params: {id: "@_id"}}}
    );
	
}]);