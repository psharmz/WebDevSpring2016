//the controller talks to the CLIENT side service to 

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $scope, $routeParams, $modal) {

        var vm = this;

        vm.formId = $routeParams.formId;

        //implement these belew 
        vm.removeField = removeField;
        vm.addField = addField;
        vm.showModal = showModal;

        //get the fields for the form 
        if (vm.formId){
            FieldService
                .getFieldsForForm(vm.formId)
                .then(fieldsCallback);
        }

        function fieldsCallback(response){
            if (response.data){
                vm.fields = response.data;
            }
        }

        //now that we have set up the vm implement the functions that this vm supports : removefield, addfield, and showmodal

        function removeField(index){
            var fieldId = vm.fields[index]._id;
            FieldService
                .deleteFieldFromForm(vm.formId, fieldId)
                .then(showAllFields);
        }

        function addField(newFieldType) {
                FieldService
                    .createFieldForForm(vm.formId, {'type': newFieldType})
                    .then(function() {
                        findFieldsForFormAndSetScope();
                });
        };

        function showModal(field) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modal.view.html',
                    controller: 'ModalInstanceController',
                    resolve: {
                        field: function () {
                            return field;
                        }
                    }
                });
                modalInstance.result
                    .then(function (field) {
                    //once we edit using the modal, use the Field Servie to update the field 
                    FieldService
                        .updateField(vm.formId, field._id, field)
                        .then(function() {
                            //not sure what goes here
                        });
                });
            };

    }

    angular
        .module('FormBuilderApp')
        .controller('ModalInstanceController', ModalInstanceController);


    function ModalInstanceController($scope, $uibModalInstance, field) {

        var vm = this; 

        if (vm.fieldType === "TEXT"){
            vm.fieldTitle = "Single Line Field";
        } else if (vm.fieldType === "TEXTAREA"){
            vm.fieldTitle = "Multiple Lines Field";
        } else if (vm.fieldType === "DATE"){
            vm.fieldTitle = "Date Field";
        } else if (vm.fieldType === "OPTIONS"){
            vm.fieldTitle = "Dropdown Field";
        } else if (vm.fieldType === "CHECKBOXES"){
            vm.fieldTitle = "Checkbox Field";
        } else if (vm.fieldType === "RADIOS"){
            vm.fieldTitle = "Radio Button Field";
        } 

        vm.cancel = cancel; 
        vm.update = update; 


        function update() {
            var optionsTextFragments = vm.fieldToEdit.optionsText.split('\n'),
                options = [];
            angular.forEach(optionsTextFragments, function(optionTextFragment) {
                var tokens = optionTextFragment.trim().split(';');
                if (tokens.length === 2) {
                    options.push({'label': tokens[0], 'value': tokens[1]});
                }
            });
            vm.fieldToEdit.options = options;
            $uibModalInstance.close(vm.fieldToEdit);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }

   
})();
