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