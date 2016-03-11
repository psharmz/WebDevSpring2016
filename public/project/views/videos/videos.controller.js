(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService, $rootScope) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //display the current array of forms for the currently logged in user
        $scope.forms = FormService.findAllFormsForUser();


        function addForm(form) {

            //sets the form title to what the user entered the title to be in the view
            form = {
                title: $scope.forms.title
            };
            // uses the FormService to add this form for the user (creates the user->forms association)
            newform = FormService.createFormForUser($scope.currentUser, form);
            //pushes the new form to scope.forms so it will show up in the table
            $scope.forms.push(newform);
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


