(function () {
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
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            // on click take to register page 
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
            // dashboard for student
            // dashboard for student show a list of classes they are part of
            .when("/student",
                {
                    templateUrl: "views/user/student.view.html",
                    controller: "StudentController",
                    resolve: {loggedin: checkLoggedIn}
                })
            // dashbaord for professor 
            // dashboard for professor shows a list of videos 
            .when("/professor",
                {
                    templateUrl: "views/user/professor.view.html",
                    controller: "ProfessorController",
                    resolve: {loggedin: checkLoggedIn}
                })
            .when("/profile",
                {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {loggedin: checkLoggedIn}
                })

            // on the professor dashbaord, a list of videos is displayed
            // by clicked on a video, they are taken to a separate screen that shows the video player
            .when("/videos/:videoId",
                {
                    templateUrl: "views/video/videoDetails.view.html",
                    controller: "ScheduleDetailController",
                    resolve: {loggedin: checkLoggedIn}
                })

            // on the student dashboard, a list of classes is displayed
            // by clicking on one of the classes, a student can view the videos for that class
            .when("/classes/:classId",
                {
                    templateUrl: "views/class/classDetails.view.html",
                    controller: "ScheduleDetailController",
                    resolve: {loggedin: checkLoggedIn}
                })

            //allows you to find a video from the video list 
            .when("/search",
                {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
            .otherwise({
                    redirectTo: "/home"
            });
    }

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };
})();