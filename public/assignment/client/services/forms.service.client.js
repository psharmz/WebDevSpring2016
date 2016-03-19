(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        //use the api to retrieve data from server
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };
        return api;


        //creates a new form for a user, given the the form and userId
        function createFormForUser(userId, form){
            return $http.post ("/api/assignment/user/" + userId + "/form", form);
        }

        //sends a http get request for find all the forms for a user
        function findAllFormsForUser(userId){
            return $http.get ("/api/assignment/user/" + userId + "/form");
        }

        //sends http delete request to remove a form with given id
        function deleteFormById(formId){
            return $http.delete ("/api/assignment/form/" + formId);
        }

        //sends a http put request to update an existing form 
         function updateFormById(formId, newForm){
            return $http.put ("/api/assignment/form/" + formId, newForm);
        }

        // sends a http get request to reutrn a form with given id 
        function findFormById(formId){
            return $http.get("/api/assignment/form/" + formId);
        }

    }
})();





