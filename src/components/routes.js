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