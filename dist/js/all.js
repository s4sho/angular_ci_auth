angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'angular-locker']);

//factory for when user is not authorized
angular.module('app')
//intercept the unauthorized responses
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})
.factory('AuthInterceptor', function ($q, $location, $window, $rootScope, $injector) {
  return {
		'response': function(response){
			if (response.status === 401) {
                console.log("Response 401");
            }
			return response || $q.when(response);
		},	
		"responseError": function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
				var $state = $injector.get('$state');
                $state.go('login');
            }			
            return $q.reject(rejection);
        }
		};
});
angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/error');
	
	$stateProvider.state('home',
	{
		url: '/',
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	});
		
	$stateProvider.state('error',
	{
		url: '/error',
		template: '<h2>The page you requested does not exists!</h2>'
	});

	$stateProvider.state('edit',
	{
		url: '/edit/:id',
		templateUrl: 'templates/edit.html',
		controller: 'EditCtrl'
	});
	
	$stateProvider.state('create',
	{
		url: '/create',
		templateUrl: 'templates/create.html',
		controller: 'CreateCtrl'
	});
	
	$stateProvider.state('register',
	{
		url: '/register',
		templateUrl: 'templates/register.html',
		controller: 'RegisterCtrl'
	});
        
    $stateProvider.state('login',
	{
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'LoginCtrl'
	});
	
	$stateProvider.state('users',
	{
		url: '/users',
		templateUrl: 'templates/users.html',
		controller: 'UsersCtrl'
	});
        
});
angular.module('app').controller('LoginCtrl', ['$scope', 'LoginFactory', '$location', '$state', function($scope, LoginFactory, $location, $state){
		
	$scope.login = function(){
		console.log($scope.user);
		LoginFactory.login($scope.user)
		.then(function(data){
			console.log(data);
			if(data.status == "logged_in"){
				//$location.url("/home");
				localStorage.setItem('booksUser', data.user);
				$state.go('home');
			}
			else {
				alert(data.message);
			}
		},
		function(msg, status){
			console.log(msg);
			//show alert
			alert("Server error");
		});
	}
	
	$scope.logout = function(){
		//alert("logginout");
		LoginFactory.logout()
		.then(function(data){
			//remove from local storage
			localStorage.removeItem('booksUser')
			$state.go('login')
		},
		function(msg, status){
			alert("Server error");
		});
	}
	
}]);



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



angular.module('app').factory('BooksFactory', ["$resource", function($resource){
	
	return $resource(
		"http://localhost/freelancer/maja/restangularjs/index.php/books/:id", 
		{id:"@_id"}, 
		{update: {method: "PUT", params: {id: "@_id"}}}
	)
	
}]);
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
angular.module('app').controller('HomeCtrl', ['$scope', '$state', 'BooksFactory', function($scope, $state, BooksFactory){
	
	
	BooksFactory.get(function(data)
	{
		$scope.books = data.response;
	});
	
	$scope.remove = function(id)
	{
			if(localStorage.getItem('booksUser') == null){
				$state.go('login');
				return;
		}
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
angular.module('app').controller('RegisterCtrl', ['$scope', 'RegisterFactory', function($scope, RegisterFactory){
	
	$scope.submit = function(user) {
		console.log('Username: ' + user.username + ' Email: ' + user.email);
                
        RegisterFactory.save({user:$scope.user}).$promise.then(function(data)
		{
			if(data.status == "invalid" && data.message.length > 0){
				alert(data.message);
				return;
			}
			if(data.response)
			{
				angular.copy({}, $scope.user);
				$scope.settings.success = "The user was successfully added";
			}
		});
	};
	
}]);
angular.module('app').factory('RegisterFactory', ["$resource", function($resource){
	
    return $resource(
        "http://localhost/freelancer/maja/restangularjs/index.php/register/:id", 
        {id:"@_id"}, 
	{update: {method: "PUT", params: {id: "@_id"}}}
    );
	
}]);
angular.module('app').controller('UsersCtrl', ['$scope', 'RegisterFactory', function($scope, RegisterFactory){
	
    RegisterFactory.get(function(data)
    {
        $scope.users = data.response;
    });
	
}]);