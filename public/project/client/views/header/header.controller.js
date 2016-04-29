(function(){ 
    'use strict';
    angular
        .module("WaitWhatApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, SecurityService) {
        //event handler declaration
        $scope.$location = $location;
        $scope.login = login; 
        $scope.logout = logout; 


        //event handler implementation
        function logout() {
        	$rootScope.loggedin = null;
        	$location.url("/home");  
        }

        function login (user) { 
            $scope.message = null; 

            SecurityService
                .login(user)
                .then(
                    function(response) {
                        $rootScope.currentUser = response.data;
                        $location.url("/videos");
                    },
                    function(err) {
                        $scope.message = "User not found";
                    }
                );
        }
    }

})();





