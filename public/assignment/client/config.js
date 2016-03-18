
'use strict';

(function() {

    'use strict';

    // retrieve the module we want to configure
    angular
        //retrieve the module by name
        .module("FormBuilderApp")
        //once you have retrieve the module, configure the function
        .config(configureRoutes);

    function configureRoutes($routeProvider) {
        //the  $routeProvider object can be used to configure the navigation
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
      
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController" 
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "profileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
    
})();



