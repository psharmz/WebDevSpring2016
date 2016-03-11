// Unlike the FormMaker, the user can log in right from 
// the home page instead of having another log in page. 
// Hence, the HeaderController provides the functionality 
// for an existing user to log in  
'use strict';

(function(){ 
    angular
        .module("WaitWhatApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope, UserService) {

        //***event handler declarations
        $scope.$location = $location;
        $scope.login = login;
        $scope.logout = logout; 

        //***event handler implementations

        //if we are not logged in, use the header to log in a user
        function login (user) {

            var user = UserService.findUserByCredentials($scope.user.username, $scope.user.password);
            //if the user successfully logs in 
            if (user) {
            //set the currentUser to the user who just logged in 
                $rootScope.currentUser = user;
                //navigate to the profile view
                $location.url("/profile");
            }
        }

        //on logout, user the UserService to set the currrent User to null 
        //take the user back to the home page 
        function logout() {
        	UserService.setCurrentUser(null);
        	$location.url("/home");  
        }
    }
})();


