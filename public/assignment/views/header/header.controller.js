
'use strict';

(function(){ 
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {

        //event handler declaration
        $scope.$location = $location;
        $scope.logout = logout; 

        //event handler implementation
        function logout() {
        	UserService.setCurrentUser(null);
        	$location.url("/home");  
        }
    }
})();

