// client side service will talk to server side service to retrieve data from model via $http 


(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
    	//set up the api that is used. IMPLEMENT CRUD 
        var api = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField


        };
        return api;

        function createFieldForForm(formId, field){
            return $http.post ("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId){
            return $http.get ("/api/assignment/form/" + formId + "/field");
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete ("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.put ("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }
    }
})();

