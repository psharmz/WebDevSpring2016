// refactoring the user model (server side) to use mongoose and promises 

var mongoose = require("mongoose");
var q = require("q");

module.exports = function () {

    //require the user schema we just created 
    var UserSchema = require("./user.schema.server.js")();

    //this doen't change
    var api = {
        //first implement CRUD operations from general requirements
        createUser: createUser,      // C for create --> post
        fin2ádAllUser: findAllUser,    // R for read --> get (entire collection)
        findByIdUser: findByIdUser,  // R for read --> get (single in collection)
        updateUser: updateUser,      // U for update --> put
        deleteUser: deleteUser,      // D for delete --> delete
        //then implement those specific to the User
        findUserByUsername: findUserByUsername, 
        findUserByCredentials, findUserByCredentials
    }
    // return it so we can listen for it 
    return api;


//basic CRUD functions implementation
    // accept the instance object,
    // add it to the collection,
    // and return the collection
    function createUser(newUser){
        var deferred = q.defer();
        UserModel.create(user, 
            function(err, doc){
                if (!err){
                    deferred.resolve(doc); 
                } else {
                    deferred.reject(err);
                }

            });
        return deferred.promise;
    }

    // take no arguements and return the collection
    function findAllUser(){
        //take no arguements and return all users
        var deferred = q.defer();
        UserModel.find(
            function (err, users){
                if (!err){
                    deferred.resolve(users); 
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    // should take an ID as an arguement, find an instance object
    // see if one of the users ID 
    // matches the ID and return the instance
    // return null otherwise 
    function findByIdUser(id){        
        var deferred = q.defer();
        UserModel.findByIdUser(id, 
            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
                return null;
            });
        return deferred.promise;
    }

    // take ID and oject instance as arguements
    // find the object instance in the corresponding collection
    // whose ID property is equal to the ID arguement
    // update the found instance with property values in the 
    // arguement instance object 
    function updateUser(userId, updatedUser){
        var deferred = q.defer();
        UserModel.update(
            {_id: userId},
            {firstName: updatedUser.firstName,
             lastName: updatedUser.lastName,
             username: updatedUser.username,
             password: updatedUser.password,
             emails: updatedUser.emails,
             phones: updatedUser.phones},
            function(err, doc){
                if (!err){
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

   
    //refactor to use mongoose model
    function deleteUser(userId){
        return UserModel.remove().where("_id").equals(userId);
    }

    // Declare additional requirement specific to the User service

    // find user by username
    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne(
            { username: username },
                function(err, doc){
                    if (!err){
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                    return null;
                }
        );
        return deferred.promise;
    }

    // find user by credentials
    function findUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne(
            { username: credentials.username,
              password: credentials.password },
              function(err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
                return null;
            });

        return deferred.promise;
    }
    
};
