angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'angular-locker']);

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
		//controller: 'LoginCtrl'
	});
	
	$stateProvider.state('users',
	{
		url: '/users',
		templateUrl: 'templates/users.html',
		controller: 'UsersCtrl'
	});
        
});
angular.module('app').factory('BooksFactory', ["$resource", function($resource){
	
	return $resource(
		"http://localhost/codeigniter/restangularjs/books/:id", 
		{id:"@_id"}, 
		{update: {method: "PUT", params: {id: "@_id"}}}
	)
	
}]);
angular.module('app').controller('CreateCtrl', ['$scope', '$stateParams', 'BooksFactory', function($scope, $stateParams, BooksFactory){
	
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
angular.module('app').controller('LoginCtrl', ['$scope', 'LoginFactory', function($scope, LoginFactory){
	
    LoginFactory.get(function(data)
    {
        $scope.loginUser = data.response;
    });
	
}]);



angular.module('app').factory('LoginFactory', ["$resource", function($resource){
	
    return $resource(
        "http://localhost/codeigniter/restangularjs/login/:id", 
        {id:"@_id"}, 
	{update: {method: "PUT", params: {id: "@_id"}}}
    );
	
}]);



angular.module('app').controller('RegisterCtrl', ['$scope', 'RegisterFactory', function($scope, RegisterFactory){
	
	$scope.submit = function(user) {
		console.log('Username: ' + user.username + ' Email: ' + user.email);
                
        RegisterFactory.save({user:$scope.user}).$promise.then(function(data)
		{
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
        "http://localhost/codeigniter/restangularjs/register/:id", 
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