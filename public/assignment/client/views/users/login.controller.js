(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    
    function LoginController($scope, UserService, $location, $rootScope){

        $scope.login = login;

        function login(user) 
        {
            if(user)
            UserService
                .login(user)
                .then(
                    function(response)
                    {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    },
                    function(err) {
                        $scope.error =  $scope.error = "User not found";
                    }
                );
            
        }


    }
})();