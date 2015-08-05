angular.module('app').factory('LoginFactory', ["$resource", "$http", '$q', function($resource, $http, $q){
	/*
    return $resource(
        "http://localhost/codeigniter/restangularjs/login/:id", 
        {id:"@_id"}, 
	{update: {method: "PUT", params: {id: "@_id"}}}
    );
	*/
	var loginUrl = "http://localhost/freelancer/maja/restangularjs/index.php/Login/login_user";
	var logoutUrl = "http://localhost/freelancer/maja/restangularjs/index.php/Login/logout";
	var factory = {};
	factory.login = function(user){
		var deferred = $q.defer();
		$http.post(loginUrl, user)
		.success(function(data){
			deferred.resolve(data)
		})
		.error(function(msg, code){
			console.log(data);
			deferred.reject(msg, code);
		});
		return deferred.promise;
	}
	
	factory.logout = function(user){
		var deferred = $q.defer();
		$http.post(logoutUrl, user)
		.success(function(data){
			deferred.resolve(data)
		})
		.error(function(msg, code){
			console.log(data);
			deferred.reject(msg, code);
		});
		return deferred.promise;
	}
	
	return factory
	
}]);


