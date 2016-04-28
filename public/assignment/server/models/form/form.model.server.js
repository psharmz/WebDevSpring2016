// need this for obfuscation
var uuid = require('node-uuid');
// need this to talking to the mongodb, no longer using mock data
var mongoose = require("mongoose");
// need this for callbacks
var q = require("q");


//implement the javascript node.js module for Form
module.exports = function(app, db) {
    //require the form schema we just created
    var FormSchema = require("./form.schema.server.js")();
    //the Form Model is a mongoose model that uses the form schema
    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {
        //first implement CRUD operations from general requirements
        createForm: createForm,      // C for create --> post
        findAllForm: findAllForm,    // R for read --> get (entire collection)
        findByIdForm: findByIdForm,  // R for read --> get (single in collection)
        updateForm: updateForm,      // U for update --> put
        deleteForm: deleteForm,      // D for delete --> delete
        //then implement those specific to the Form
        findFormByTitle: findFormByTitle,
        //so we can now get the data from mongoose instead of serving a mock
        getMongooseModel: getMongooseModel

    };
    // return it so we can listen for it 
    return api;

    //get the mongoose model 
    function getMongooseModel() {
        return FormModel;
    }


//basic CRUD functions
    // accept the instance object,
    // add it to the collection,
    // and return the collection
    function createForm(newForm) {
        //for promises
        var deferred = q.defer();
        //use the mongoose model to create a form 
        FormModel.create(form,
            function (err, doc) {
                //no problems, resolve promise if hit an error, reject the promise
                if (!err) {
                    deferred.resolve(doc);
                } else {
                    //if hit an error, reject the promise
                    deferred.reject(doc);
                }
            });
        //return whatever promise output we get
        return deferred.promise;
    }

    // take no arguements and return the collection
    function findAllForm() {
        //take no arguements and return all forms
        var deferred = q.defer();
        FormModel.find(
            function (err, forms) {
                if (!err) {
                    deferred.resolve(forms);
                } else {
                    deferred.reject(err);
                }
            }
        );
        //return whatever promise output we get
        return deferred.promise;
    }

    // should take an ID as an arguement, find an instance object
    // see if one of the forms ID 
    // matches the ID and return the instance
    // return null otherwise 
    function findByIdForm(id) {
        var deferred = q.defer();

        FormModel.findByIdForm(formId,
            function (err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
                //otherwise, return null becuase we found nothing
                return null;
            });
        //return whatever promise output we get
        return deferred.promise;
    }


    //refactor updateForm to use the schema
    function updateForm(FormId, updatedForm) {
        var deferred = q.defer();
        FormModel.update(
            {_id: formId},
            {
                userId: updatedForm.userId,
                title: updatedForm.title,
                fields: updatedForm.fields,
                created: updatedForm.created,
                update: updatedForm.update
            },

            function (err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            }
        );
        //return whatever promise output we get
        return deferred.promise;
    }

    //refactor deleteForm to use the Mongoose Model 
    function deleteForm(FormId) {
        return FormModel.remove().where("_id").equals(formId);
    }

    // find a single form whose title is equal to title parameter
    // return null otherwise
    // refactor to use Mongoose Model 
    function findFormByTitle(formTitle) {
        var deferred = q.defer();

        FormModel.findOne(
            {title: formTitle},

            function (err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                } else if (doc) {
                    deferred.reject(err);
                }

                return null;
            }
        );
        //return whatever promise output we get
        return deferred.promise;
    }
}

