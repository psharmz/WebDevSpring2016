// need this to talking to the mongodb, no longer using mock data
var mongoose = require("mongoose");
// need this for callbacks
var q = require("q");


module.exports = function(db, mongoose, formModel){

    //require the form model 
    var Form = formModel.getMongooseModel();

    //implement CRUD
    var api = {
        createFieldForForm: createFieldForForm,
        getFieldsForForm: getFieldsForForm,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField

        createFieldForForm : createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField

    };
    return api;

           
            
    function getFieldsForForm(formId){
        return Form.findById(formId).select("fields");
    }


    function deleteFieldFromForm(formId, fieldId){
        return Form
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            )
    }

    // create a field in a form
    function createFieldForForm(formId, field){
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function updateField(formId, field, fieldId){
        return Form
            .findById(formId)
            .then(
                function(form){
                    var updatedField = form.fields.id(fieldId);
                    updatedField.label = field.label;
                    updatedField.type = field.type;

                    if (field.placeholder){
                       updatedField.placeholder = field.placeholder;
                    } else {
                        updatedField.options = field.options;
                    }

                    return form.save();
                }
            );
    }


}