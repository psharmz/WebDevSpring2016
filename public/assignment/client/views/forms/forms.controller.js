(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location){
        // incase we want to move to the fields tab
        $scope.$location = $location;

        // get the currentUser from the root 
        $scope.currentUser = $rootScope.currentUser; 


        // use form service to get all the users' forms
        if ($scope.user){
            FormService.findAllFormsForUser($scope.user._id, callbackforms);
        }
        function callbackforms(forms){
            if (forms){
                $scope.forms = forms;
            }
        }

        // we want to prevent people from accessing this page by just updating the URL 
        // make sure we are actually currentUser
        if ($rootScope.currentUser) {
            //even handlers 
            $scope.addForm = addForm;
            $scope.selectForm = selectForm;
            $scope.updateForm = updateForm;
            $scope.deleteForm = deleteForm;
            $scope.showFields = showFields;
        // if we are not logged in, take person to the login page 
        } else $location.url("/login");

        
        /////// implement event handlers beloer 


        //addForm 
        function addForm(form){
            // everytime we add a form, reset the errors 
            $scope.error = null;
            $scope.message = null;

            $scope.formIndex = null;

            if (form.title) {
                FormService
                        //use the service to add it to the list of form in the model 
                        .createFormForUser($scope.user._id, form)
                        .then(addFormCallback);
                } else {
                    $scope.error = "Please enter a form name";
                }
            } else {
                $scope.error = "Please enter a form";
            }
        }

        function addFormCallback(newForm){
            if (newForm.data) {
                $scope.forms = newForm.data
                $scope.form = {};
                $scope.message = "Form added successfully";
            } else {
                $scope.message = "Error adding form";
            }
        }

        // selecting a form 
        function selectForm(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.formIndex = index;

            //set the top title to the selected form's title
            $scope.form = {
                title: $scope.forms[index].title
            };

        }

        //updateForm
        function updateForm(form){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            if ($scope.formIndex != null){
                var id = $scope.forms[$scope.formIndex]._id;
                form._id = $scope.forms[$scope.formIndex]._id;
                form.userId = $scope.forms[$scope.formIndex].userId;
                FormService
                    .updateFormById(id, form)
                    .then(updatecallback);
            } else {
                $scope.error = "Could not update form";
            }
        }

        function updatecallback(updatedForm){
            // if we added the form, add it to our list of forms so we can display an updated list 
            if (updatedForm.data) {
                $scope.forms = updatedForm.data; 

                // clear the input field and reset index 
                $scope.form = {};
                $scope.formIndex = null;
                $scope.message = "Form updated";
            } else 
                $scope.error = "Updating Form Failed";{
            }
        }

        //deleteForm 
        function deleteForm(index){
            $scope.error = null;
            $scope.message = null; 
            $scope.formIndex = null; 

            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(deletecallback);
        }

        function deletecallback(forms){
            FormService
                .findAllFormsForUser($scope.user._id)
                .then(function(forms){
                if (forms.data){
                    $scope.forms = forms.data;
                    $scope.message = "Form Deleted";
                } else {
                    $scope.error = "Error deleting form";
                }
            });
        }

        function showFields(index){
            $scope.formId = $scope.forms[index]._id;
            $location.path('/form/' +  $scope.formId + '/fields');
        }

    }
})();