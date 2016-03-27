// use make data for now for the user
var forms = require("./user.users.json");
// need this for obfuscation
var uuid = require('node-uuid');

//implement the javascript node.js module for Form
module.exports = function(app, db){

    var api = {
        //first implement CRUD operations from general requirements
        createForm: createForm,      // C for create --> post
        findAllForm: findAllForm,    // R for read --> get (entire collection)
        findByIdForm: findByIdForm,  // R for read --> get (single in collection)
        updateForm: updateForm,      // U for update --> put
        deleteForm: deleteForm,      // D for delete --> delete
        //then implement those specific to the Form
        findFormByTitle: findFormByTitle, 
    
    }
    // return it so we can listen for it 
    return api;


//basic CRUD functions
    // accept the instance object,
    // add it to the collection,
    // and return the collection
    function createForm(newForm){
        Form._id = uuid.v1();
        forms.push(newForm);
        //return newForm; but i think thats wrong so try
        return forms; 
    }

    // take no arguements and return the collection
    function findAllForm(){
        //take no arguements and return all forms
        return forms; 
    }

    // should take an ID as an arguement, find an instance object
    // see if one of the forms ID 
    // matches the ID and return the instance
    // return null otherwise 
    function findByIdForm(id){        
        for (var f in forms) {
            if (forms[f]._id === id) {
                return forms[f];
            }
        }
        return null;
    }

    // take ID and oject instance as arguements
    // find the object instance in the corresponding collection
    // whose ID property is equal to the ID arguement
    // update the found instance with property values in the 
    // arguement instance object 

    // question...are we supposed to 
    // respond with the updated update Form?
    // assignment doesn't specify 
    function updateForm(FormId, updatedForm){
        for (var f in forms) {
            if (forms[f]._id === FormId) {
                forms[f].firstName = updatedForm.firstName;
                forms[f].lastName = updatedForm.lastName;
                forms[f].Formname = updatedForm.Formname;
                forms[f].password = updatedForm.password;
                forms[f].email = updatedForm.email;
                return forms[f];
            }
        }
        return null;
    }

    // accept an ID as an arguement, 
    // remove instance object from the correspond collection
    // whose ID property is equal to the ID arguement
    // question... are we supposed to 
    // respond with the the updated list?
    function deleteForm(FormId){
        for (var f in forms){
            if (forms[f]._id === FormId){
                forms.splice(f, 1);
            }
        }
        return forms;
    }

// Declare additional requirement specific to the User service

    // find a single form whose title is equal to title parameter
    // return null otherwise
    function findFormByTitle(username){
        for (var f in ) {
            if (users[f].username === username) {
                return users[f];
            }
        }
        return null;
    }

