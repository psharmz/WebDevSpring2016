(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope, $location){

        //refactor to use vm instead of vm 
        var vm = this; 


        // incase we want to move to the fields tab
        vm.$location = $location;

        // get the currentUser from the root 
        vm.currentUser = $rootScope.currentUser; 


        // all the even handlers we will include
        // we want to prevent people from accessing this page by just updating the URL 
        // make sure we are actually currentUser
        if ($rootScope.currentUser) {

            //even handlers 
            vm.addForm = addForm;
            vm.selectForm = selectForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.showFields = showFields;

        // if we are not logged in, take person to the login page 
        } else 
            $location.url("/login");

        // use form service to get all the users' forms
        if (vm.user){
            FormService
                .findAllFormsForUser(vm.user._id)
                .then(callbackforms);
        }

        // implementing functions and event handlers 

        // on promise, execute the callback 
        function callbackforms(forms){
            // if the forms that we get have data 
            if (forms.data){
                // add the data to the model so we can view them
                vm.forms = forms.data;
            }
        }

        //addForm 
        function addForm(form){

            // everytime we add a form, reset the errors 
            vm.error = null;
            vm.message = null;

            //so we know what form we have selected 
            vm.formIndex = null;

            //if the user inputed a title 
            if (form.title) {
                FormService
                    //use the service to add it to the list of forms in the model 
                    .createFormForUser(vm.user._id, form)
                    .then(addFormCallback);

            } else {
                //otherwise, prevent the adding of an empty form 
                vm.error = "Please enter a form name";
            } 
        }

        function addFormCallback(updatedForms){
            // if we have a list of forms after adding a new one
            if (updatedForms.data) {
                // update the forms in the model
                vm.forms = newForm.data
                // reset our form at the top to null so we can add more 
                vm.form = {};
                // let the user know in the view that the form was added
                vm.message = "Form added successfully";
            } else {
                //if the service didn't add the form, then throw an error 
                vm.message = "Error adding form";
            }
        }

        // selecting a form 
        function selectForm(index){
            // show user error and success messages
            vm.error = null;
            vm.message = null;

            vm.formIndex = index;

            //set the top title to the selected form's title
            vm.form = {
                title: vm.forms[index].title
            };

        }

        //updateForm
        function updateForm(form){
            // show user error and success messages
            vm.error = null;
            vm.message = null;

            if (vm.formIndex != null){
                var id = vm.forms[vm.formIndex]._id;
                form._id = vm.forms[vm.formIndex]._id;
                form.userId = vm.forms[vm.formIndex].userId;
                FormService
                    .updateFormById(id, form)
                    .then(updatecallback);
            } else {
                vm.error = "Could not update form";
            }
        }

        function updatecallback(updatedForm){
            // if we added the form, add it to our list of forms so we can display an updated list 
            if (updatedForm.data) {
                vm.forms = updatedForm.data; 

                // clear the input field and reset index 
                vm.form = {};
                vm.formIndex = null;
                vm.message = "Form updated";
            } else 
                vm.error = "Updating Form Failed";{
            }
        }

        //deleteForm 
        function deleteForm(index){
            vm.error = null;
            vm.message = null; 
            vm.formIndex = null; 

            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(deletecallback);
        }

        function deletecallback(forms){
            FormService
                .findAllFormsForUser(vm.user._id)
                .then(function(forms){
                if (forms.data){
                    vm.forms = forms.data;
                    vm.message = "Form Deleted";
                } else {
                    vm.error = "Error deleting form";
                }
            });
        }

        function showFields(index){
            vm.formId = vm.forms[index]._id;
            $location.path('/form/' +  vm.formId + '/fields');
        }

    }
})();