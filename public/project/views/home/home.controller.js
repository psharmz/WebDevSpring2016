//homeController has the functionality for registering a new user from the homepage

(function(){
    "use strict";
    angular
        .module("WaitWhatApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, UserService, $location) {
    	$rootScope.$location = $location;

        var model = this;

        model.register = register;

        function init() {
        }

        init();

        function register (user) {
            if(user.password != user.vpassword || !user.password || !user.vpassword)
            {
                $rootScope.danger = "Your passwords don't match";
            }
            else
            {
                UserService
                    .register(user)
                    .then(function(response) {
                        if(response != null)
                        {
                            $rootScope.currentUser = response;
                            $location.url("/profile/" + response.data._id);
                        }
                        else
                        {
                            $rootScope.danger = "Unable to register";
                        }
                    });
            }

        }
    }

})();
