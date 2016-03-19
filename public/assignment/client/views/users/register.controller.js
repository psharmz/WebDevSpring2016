
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function registerController($rootScope, UserService, $location, $scope) {
        
        $scope.register = register;

        //register a new user 
        function register(user) {

            $scope.message = null;

            //warn the user if the enetered passwoerd dont watch
            if(user.password != user.vpassword) {
                $scope.message = "Your passwords don't match";
            }
            //warn the user if they didnt fill out password info
            if (!user.password || !user.vpassword) {
                $scope.message = "Please enter password twice"

            }
            //warn the user that username info is not filled out
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            //warn the user if they did not fill out their email
            if (!user.email) {
                $scope.message = "Please provide an email";
                return;
            }
            //warn user if nothing is filled out at all 
            if (user === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }

            // use the user service to see if this name is already taken
            UserService
                .findUserByUsername(user.username)
                .then(decideToCreate);
        }

        function decideToCreate(user) {
            //if we do find someone who already as that nickname
            //alert the user via a message
            if (user) {
                $scope.message = "Someone already has the Username. Pick another one"
                return; 
            } else
                UserService
                    .createUser($scope.user)
                    .then(newUserResponse); 
            }
        }

        function newUserResponse(user) {
            //if we have successfully created a new user
            //log them in, set as the current user, and take them to the profile
            if (user.data) {
                $rootScope.currentUser = user.data;
                $location.url("/profile");
            }
        }
 }


