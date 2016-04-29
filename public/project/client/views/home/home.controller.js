(function() {
    'use strict';

    angular
        .module("WaitWhatApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location){
        $scope.login = login;
        $scope.register = register;

        function login(){
            $location.url("/login");
        }

        function register(){
            $location.url("/register");
        }
    }
})();