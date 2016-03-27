(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService, $rootScope) {
        $scope.register = register;
        $scope.message = null;

        function register(user) {
            $scope.message = null;
            if (user === null || !user.username || !user.password || !user.email) {
                $scope.message = "Please fill in all the fields";
                return;
            }
            if (user.password != user.vpassword) {
                $scope.message = "Passwords must match";
                return;
            }
            // make sure that the user doesn't already exist in our database
            UserService.findUserByCredentials(user.username, user.password, callback);
        }

        
        function callback(user) {
            // if the user account already exists, alert the user 
            if (user != null) {
                $scope.message = "you already have an account!";
                return;
            }
            // else, create a the user using the user service 
            UserService.createUser($scope.user, createdUser);
        }

        // set the currentUser to the new user and take them to their profile 
        function createdUser(newUser) {
            $rootScope.currentUser = newUser;
            $location.url("/profile");
        }

    }
})();