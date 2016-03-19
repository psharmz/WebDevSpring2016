(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        //check for errors
        $rootScope.error = null;
        $rootScope.message = null; 

        //return to home if you try and get to the page by changing the URL
        $rootScope.currentUser = UserService.getCurrentUser();
        if (!$rootScope.currentUser) {
            $location.url("/home");

        }
        //initialize update function
        $scope.updateUser = updateUser;

        //update function 
        function updateUser(user) {
            if (user === null) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.firstName) {
                $scope.error = "Please provide your first name";
                return;
            }
            if (!user.lastName) {
                $scope.error = "Please enter last name";
                return;
            }
            if (!user.username) {
                $scope.error = "Please enter username";
                return;
            }
            if (!user.password) {
                $scope.error = "Please enter a password";
                return;
            }
            if (!user.email) {
                $scope.error = "Please enter your email address";
                return;
            }

            var userId = $scope.currentUser._id;

            UserService
                .updateUser(userId, user)
                .then(updateUserResponse);
       }

       function updateUserResponse(response){
            if (response.data){
                $scope.message = "User updated successfully";
                $scope.currentUser = response.data;
                $rootScope.currentUser = response.data;
            } else {
                $scope.error = "Cannot update the user";
            }
        }

    }



}
})();




