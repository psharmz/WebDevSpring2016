//take in the the Model as an arguement so we can CRUD the data 
module.exports = function(app, fieldModel){

    // form service endpoints 
    app.get("/api/assignment/form/:formId/field", findAllFieldsbyFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findByIdFieldAndForm); 
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField); 
    app.post("/api/assignment/form/:formId/field", createField); //
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField); 


    // requests a form id 
    // responds with array of fields belonging to that form
    function findFieldByFormId(req, res){
        var formId = req.params.formId;
        var fields = formModel.findFieldByFormId(formId);
        res.json(fields);
    }

    // requests the formid and fieldid 
    // responds with matching field object 
    function findByIdFieldAndForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFormIdAndFieldId(formId, fieldId);
        res.json(field);
    }

    // requests field id and form id and responds with updated list of forms
    // after the field has been deleted 
    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.deleteField(formId, fieldId);
        res.json(forms);
    }

    // requests the field body for the new field and 
    // responds with updated form 
    function createField(req, res){
        var field = req.body;
        var formId = req.params.formId;
        var form = formModel.createField(formId, field);
        res.json(forms);
    }

    // requests the new body of the updated field and
    // responds with the updated form 
    function updateField(req, res){
        var field = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.updateField(formId, field, fieldId);
        res.json(form);
    }


}




