// This is the EnrollementService CLIENT SIDE

//implementation for the EnrollmentService (client side)
//this is used to display classes a student is registered to 
//and only videos for that class  

(function() {
    'use strict';

    angular
        .module("WaitWhatApp")
        .factory("EnrollmentService", EnrollmentService);

    function EnrollmentService($http){
        var model = {
             
            //impelment CRUD
            createEnrollmentEntry: createEnrollmentEntry,
            findEnrollmentEntry: findEnrollmentEntry,
            updateEnrollmentEntry: updateEnrollmentEntry,
            deleteEnrollmentEntry: deleteEnrollmentEntry
        };

        return model;

        function createEnrollmentEntry(entry){
            return $http.post("/api/project/enroll", entry);
        }

        function findEnrollmentEntry(userId, enrollmentId){
            return $http.get("/api/project/enroll?userId=" + userId + "&EnrollmentId=" + enrollmentId);
        }

        function updateEnrollmentEntry(updatedEntry){
            return $http.put("/api/project/enroll", updatedEntry);
        }

        function deleteEnrollmentEntry(userId, enrollmentId){
            return $http.delete("/api/project/enroll/" + userId + "/" + enrollmentId);
        }

      





    }
})();
