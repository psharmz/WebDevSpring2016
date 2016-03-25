(function(){ 
    'use strict';
    angular
        .module("WaitWhatApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {

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

            var user = UserService.findUserByCredentials($scope.user.email, $scope.user.password);
            //if the user successfully logs in 
            if (user) {
            //set the currentUser to the user who just logged in 
                $rootScope.currentUser = user;
                //navigate to the profile view
                $location.url("/videos");
                $rootScope.loggedin = true; 
            }
        }
    }

})();


