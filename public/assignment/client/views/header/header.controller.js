(function(){ 
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {

        //event handler declaration
        $scope.$location = $location;
        $scope.logout = logout; 

        //event handler implementation
        function logout() {
        	$rootScope.currentUser = null;
        	$location.url("/home");  
        }
    }
})();

