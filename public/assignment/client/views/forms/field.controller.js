//the controller talks to the CLIENT side service to 

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $scope, $routeParams, $modal) {

        var model = this;

        model.formId = $routeParams.formId;

        //implement these belew 
        model.removeField = removeField;
        model.addField = addField;
        model.showModal = showModal;

        //get the fields for the form 
        if (model.formId){
            FieldService
                .getFieldsForForm(model.formId)
                .then(fieldsCallback);
        }

        function fieldsCallback(response){
            if (response.data){
                model.fields = response.data;
            }
        }

        //now that we have set up the model implement the functions that this model supports : removefield, addfield, and showmodal

        function removeField(index){
            var fieldId = model.fields[index]._id;
            FieldService
                .deleteFieldFromForm(model.formId, fieldId)
                .then(showAllFields);
        }

        function addField(newFieldType) {
                FieldService
                    .createFieldForForm(model.formId, {'type': newFieldType})
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
                        .updateField(model.formId, field._id, field)
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

        var model = this; 

        if (model.fieldType === "TEXT"){
            model.fieldTitle = "Single Line Field";
        } else if (model.fieldType === "TEXTAREA"){
            model.fieldTitle = "Multiple Lines Field";
        } else if (model.fieldType === "DATE"){
            model.fieldTitle = "Date Field";
        } else if (model.fieldType === "OPTIONS"){
            model.fieldTitle = "Dropdown Field";
        } else if (model.fieldType === "CHECKBOXES"){
            model.fieldTitle = "Checkbox Field";
        } else if (model.fieldType === "RADIOS"){
            model.fieldTitle = "Radio Button Field";
        } 

        model.cancel = cancel; 
        model.update = update; 


        function update() {
            var optionsTextFragments = model.fieldToEdit.optionsText.split('\n'),
                options = [];
            angular.forEach(optionsTextFragments, function(optionTextFragment) {
                var tokens = optionTextFragment.trim().split(';');
                if (tokens.length === 2) {
                    options.push({'label': tokens[0], 'value': tokens[1]});
                }
            });
            model.fieldToEdit.options = options;
            $uibModalInstance.close(model.fieldToEdit);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }

   
})();
