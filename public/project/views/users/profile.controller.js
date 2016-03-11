"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("profileController", profileController);

    function profileController($rootScope, UserService, $location) {

        //check for errors
        $rootScope.error = null;
        $rootScope.message = null; 

        //return to home if you try and get to the page by changing the URL
        $rootScope.currentUser = UserService.getCurrentUser();
        if (!$rootScope.currentUser) {
            $location.url("/home");

        }

        //initialize update function
        $scope.update = update;

        //update function 
        function update (user) {

            // cehck for errors
            $rootScope.error = null;
            $rootScope.message = null;

            //use the User Service to update the user info
            $rootScope.currentUser = UserService.updateUser(user);

            // the updated user information is valid, update
            if (user) {
                $rootScope.message = "User updated successfully";
                //update the CurrentUser to have the changes that were just made
                UserService.setCurrentUser($rootScope.currentUser);
            } else {
                //something went wrong
                $rootScope.message = "Unable to update the user";
            }
        }



    }
})();




