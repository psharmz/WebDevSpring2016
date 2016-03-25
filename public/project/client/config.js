(function() {

    'use strict';

    // retrieve the module we want to configure
    angular
        //retrieve the module by name
        .module("WaitWhatApp")
        //once you have retrieve the module, configure the function
        .config(configureRoutes);

    function configureRoutes($routeProvider) {
        //the  $routeProvider object can be used to configure the navigation
        $routeProvider

            // the home view shows the sign up modal and login form in the header
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            // when you log in, you are taken to the videos page, which is just a list of all the videos
            .when("/videos", {
                templateUrl: "views/videos/videos.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
    
})();


