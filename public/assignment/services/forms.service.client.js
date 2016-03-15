(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        //set up the model to include all forms and functions
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ], 

        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
        };

        //once we have set up the model with forms[] and functions, return
        return model;  

        //creates a new form for a user, given the the form and userId
        function createFormForUser(userId, form, callback) {
            var form = {
                "_id": (new Date).getTime(),
                "title": form.title, 
                "userId" : userId
            };
            model.forms.push(form);
            //calls back with the form that was just created
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var formsForUser = []; 
            for (var u in model.forms) {
                if (model.forms[u].userId === userId) {
                    formsForUser.push(model.forms[u]);
                }
            }
            //call back with array of forms for the user
            callback(userForms); 

        }

        function deleteFormById(formId, callback) {
            for (var u in model.forms) {
                if (model.forms[u]._id === formId) {
                    model.forms.splice(u, 1);
                }
            }
            //calls back with array of forms
            callback(model.forms); 

        }

        function updateFormById(formId, newForm, callback) {
            for (var u in model.forms) {
                if (model.forms[u]._id === formId) {
                    var formInRecord = model.forms[u];
                    formInRecord.title = newForm.title; 
                    formInRecord.userId = newForm.userId;
                }
            }
            //calls back with updated form
            callback(formInRecord); 
        }
    }
})();
