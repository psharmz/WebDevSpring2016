(function(){
    'use strict';

    angular
        .module("WaitWhatApp")
        .controller("CoursesController", CoursesController);

    function CoursesController($rootScope, $scope, $location, VideoService, EnrollmentService){

        // $scope.updateAvailability = updateAvailability;
        // $scope.selectSchedule = selectSchedule;
        // $scope.getAvailability = getAvailability;
        // $scope.showScheduleDetails = showScheduleDetails;

        if ($rootScope.currentUser){
            $scope.userId = $rootScope.currentUser._id;
            $scope.email = $rootScope.currentUser.email;
        }

        // get this user's courses
        if ($scope.email){
            EnrollmentService
                .findAllCourses()
                .then(findCoursesResponse);
        }


        function getCourses(){
            for (var s in $scope.schedules){
                EnrollmentService
                    .findEnrollmentEntry($scope.userId, $scope.courseId[s]._id)
                    .then(setCourseListing);
            }
        }

        function setCourseListing(response){
            if (response.data){
                for (var s in $scope.courses){
                    if ($scope.courses[s]._id == response.data.courseId){
                        //add to a list. and then show that list in the view. 
                    }
                }
            }
        }

        // select a course from the list
        function selectCourse(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedCourseIndex = index;

            $scope.Course = {
                date : $scope.courses[index]._id,
                name : $scope.courses[index].name,
                professor: $scope.schedules[index].professor
            };

        }

        // navigate to the course details page which lists all the videos
        function showCourseVideos(index){
            $scope.courseId = $scope.courses[index]._id;
            $location.path('/course/' +  $scope.courseId);
        }

    }
})();