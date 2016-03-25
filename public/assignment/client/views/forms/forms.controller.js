(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

// the FormController requires the scope, rootscope, FormService API, and location
    function FormController($scope, FormService, $rootScope, $location) {

        //get the currentUser for the rootScope (whoever is logged in)
        //set the logged in user as the user for the Form page scope
        $scope.user = $rootScope.currentUser;

        // display the current array of forms for the currently logged in user
        // get forms for current user using service
        function init() {
            if ($scope.user){
                FormService
                    .findAllFormsForUser($scope.user._id)
                    .then(function(forms) {
                        $scope.forms = forms; 
                });
            };
        }

        init(); 


        //event handlers 
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;



        //to add form 
        function addForm(form) {

            //error and success messages
            $scope.error = null;
            $scope.message = null; 

            //set what the current selected form is 
            $scope.selectedFormIndex = null; 

            //make sure form information (right now only need title) is entered before adding a new Form 
            //if title information was included for new form
            //also make sure that we are logged on...although technically you shouldn't be able to get 
            //to this page if you aren't but just in case 
            if (form.title && $scope.user) {
                //create a new form for the user using FormService
                FormService
                    .createFormForUser($scope.user._id, form)
                    // use the .then to avoid nested if's
                    .then(function() {
                        init(); 
                        if scope.forms === forms {
                            $scope.form = {}; 
                            $scope.message = "Added New Form"; 
                        } else {
                            $scope.message = "Could not add new form";
                        }


        // to update form
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

        // to delete form
        function deleteForm(index) {
            
            //uses FormService to delete the Form from the array
            //the function returns the updated array of forms
            //set the scope forms to the updated array so that the view 
            //display the correct information

            //get the form id for the form at the index
            var formId = $scope.forms[index]._id
            //use the .then to return after the service request has gone through
            FormService.deleteFormById(formId)
                .then(function() {

                })
        }

        // to select form 
        function selectForm(index) {

            //in case the form object is undefined, null, or set to something else
            $scope.form = {}; 

            //mark the currently selected form
             = $scope.forms[index]

            //updates the form with the currently selected form
            updateForm(selectedForm); 
        }
    }
})();


