(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope) {

        //get the current user
        $scope.user = $rootScope.currentUser;

        //event handlers 
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        // display the current array of forms for the currently logged in user
        // get forms for current user using service
        if ($scope.user){
            FormService.findAllFormsForUser($scope.user._id, function callback(forms){
            if (forms){
                $scope.forms = forms;
            }
        });
        }

        //to add form 
        function addForm(form) {

            //error and success messages
            $scope.error = null;
            $scope.message = null; 

            $scope.selectedFormIndex = null; 

            //make sure form information is entered before adding a new Form 
            if (form) {
                //if title information was included for new form
                if (form.title) {
                    //create a new form for the user using FormService
                    FormService.createFormForUser($scope.user._id, form, function callback(newForm){
                        if (newForm) {
                            $scope.forms.push(newForm);
                            $scope.form = {}; 
                            $scope.message = "Added New Form"; 
                        } else {
                            $scope.message = "Could not add new form"; 
                        }
                    });
                } else {
                    $scope.error = "You must provide a form name";
                }
            } else {
                $scope.error = "You must provide a form";
            }
        }




        function updateForm(form) {

            // error validation
            $scope.error = null;

            //the only attribute that could be updated about the form is the title
            form = {
                title: $scope.forms.title
            };

            //uses FormServce to update the selectedForm
            form = FormService.updateFormById(form._id, form);

            //in the view, display the form with the updates
            $scope.forms[$scope.selectedFormIndex] = {
                title: $scope.forms.title
            }
        }

        function deleteForm(index) {
            
            //uses FormService to delete the Form from the array
            //the function returns the updated array of forms
            //set the scope forms to the updated array so that the view 
            //display the correct information

            //get the form id for the form at the index
            var formId = $scope.forms[index]._id
            $scope.forms = FormService.deleteFormById(formId)
        }

        function selectForm(index) {

            //mark the currently selected form
            var selectedForm = $scope.forms[index]

            //updates the form with the currently selected form
            updateForm(selectedForm); 
        }
    }
})();


