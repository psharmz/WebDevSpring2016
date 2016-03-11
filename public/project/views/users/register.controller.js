
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($rootScope, UserService, $location) {
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





