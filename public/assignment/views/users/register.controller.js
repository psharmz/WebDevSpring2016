
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

//use mongoose. connecting to another network/server to modify the database
//no longer a synchronous
//async- sends command to db server and doesnt wait for the server to respond
//goes on to respond other incoming requests
//one node.js server cannot wait for db server to come back
//needs to be free to listen to other users
//register the callback function....server comes back with two things
// 1. error
// 2. or come back with actual instance/object that was inserted to the db
// the user object is passed to check it against the schema and will provide default values
// doc tells you the default values 
UserModel.create(user,function (err, doc) {
    console.log(doc);
})
})();





