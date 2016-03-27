(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    
    function LoginController($scope, UserService, $location, $rootScope){

        $scope.login = login;

        function login(user){
            // everytime we log in, reset the error display on the view 
            $scope.error = null;

            //use the UserService to find the user 
            UserService.findUserByCredentials(user.username, user.password, callback);
        }

        // call back sets 
        function callback(userInDB){
            if (userInDB){
                // set the currentUser to the one we found
                // got to profile page 
                $rootScope.currentUser = userInDB;
                $location.url("/profile");
            } else {
                // throw an error if we dont find anything 
                $scope.error = "User not found";
            }
        }
    }
})();