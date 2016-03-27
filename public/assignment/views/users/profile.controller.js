(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, UserService, $scope){
        //each time we hit 'update', rest the error displays
        $scope.error = null;
        $scope.message = null;

        // get the currentUser from the root 
        $scope.currentUser = $rootScope.currentUser; 

        // we want to prevent people from accessingthis page by just updating the URL 
        // make sure we are actually currentUser
        if ($rootScope.currentUser) {
            $scope.updateUser = updateUser;
        // if we are not logged in, take person to the login page 
        } else $location.url("/login");


        //functions for implementation above 
        function updateUser(user){
            if (user === null || !user.firstName || !user.lastName || !user.email || !user.password) {
                $scope.error = "Please fill in all the fields";
                return;
            }
            var userId = $scope.currentUser._id;
            // if we run into no problems, then update the user 
            UserService.updateUser(userId, user, callback);
        }

        //once we have updated the backend, let the user know in the view 
        function callback(updatedUser){
            if (updatedUser){
                $scope.message = "user updated";
                $scope.currentUser = updatedUser;
                $rootScope.currentUser = updatedUser;
            } else {
                $scope.error = "unable to update the user";
            }
        }
    }

})();