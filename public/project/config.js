
'use strict';

(function()
{
    // retrieve the module we want to configure
    angular
        //retrieve the module by name
        .module("WaitWhatApp")
        //once you have retrieve the module, configure the function
        .config(configureRoutes);

    function configureRoutes($routeProvider) {
        //the  $routeProvider object can be used to configure the navigation
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
      
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController", 
                controllerAs: "model"
            })
            .when("/forms", {
                templateUrl: "views/videos/videos.view.html",
                controller: "VideoController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "profileController"
            })
            .when("/admin", {
                templateUrl: "views/professor/professor.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
    
})();



