//take in the the Model as an arguement so we can CRUD the data 
module.exports = function(app, formModel){

    app.post("/api/assignment/user/:userId/form", createForm); // Create with userid 
    app.get("/api/assignment/form/:formId", findByIdForm); // Read for forms with formId
    app.get("/api/assignment/user/:userId/form", findAllFormByUserId); // Read for forms with UserId
    app.put("/api/assignment/form/:formId", updateForm); // Update form for formId
    app.delete("/api/assignment/form/:formId", deleteForm); // Delete form with formId


    // request to create form and respond with all users
    function createForm(req, res){
        var newForm = req.body;
        // use the formModel to create a form using the api 
        // the api will 
        var forms = formModel.createForm(newUser);
        res.json(forms);
    }

    // requests id to find a form given an respond with the form
    function findByIdForm(req, res){
        var id = req.params.formId;
        var form = formModel.findByIdForm(id);
        res.json(form);
    }

    // requests the userId and responds with the forms for that user
        function findAllFormByUserId(req, res){
        var userId = req.params.userId;
        var forms = formModel.findAllFormByUserId(userId);
        res.json(forms);
    }

    // request to update a form with body 
    // parse the id from the URL
    // update the form with that id with new body
    // respond with the updated form instance
    function updateForm(req, res){
        var updatedForm = req.body;
        var id = req.params.id;
        var users = formModel.updateUser(id, updatedUser);
        res.json(users);
    }


    //request to read to delete particular form (check id)
    //respond with the updated list of users
    function deleteForm(req, res){
        var id = req.params.formId;
        var users = formModel.deleteForm(formid);
        res.json(users);
    }









