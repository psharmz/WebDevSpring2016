"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {

        $scope.login = login;

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
    }

})();

