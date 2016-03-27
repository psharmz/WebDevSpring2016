
// use make data for now for the user
var users = require("./user.users.json");
// need this for obfuscation
var uuid = require('node-uuid');

//implement the javascript node.js module for User
module.exports = function(){

    var api = {
        //first implement CRUD operations from general requirements
        createUser: createUser,      // C for create --> post
        findAllUser: findAllUser,    // R for read --> get (entire collection)
        findByIdUser: findByIdUser,  // R for read --> get (single in collection)
        updateUser: updateUser,      // U for update --> put
        deleteUser: deleteUser,      // D for delete --> delete
        //then implement those specific to the User
        findUserByUsername: findUserByUsername, 
        findUserByCredentials, findUserByCredentials
    }
    // return it so we can listen for it 
    return api;


//basic CRUD functions
    // accept the instance object,
    // add it to the collection,
    // and return the collection
    function createUser(newUser){
        user._id = uuid.v1();
        users.push(newUser);
        //return newUser; but i think thats wrong so try
        return users; 
    }

    // take no arguements and return the collection
    function findAllUser(){
        //take no arguements and return all users
        return users; 
    }

    // should take an ID as an arguement, find an instance object
    // see if one of the users ID 
    // matches the ID and return the instance
    // return null otherwise 
    function findByIdUser(id){        
        for (var u in users) {
            if (users[u]._id === id) {
                return users[u];
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
    // respond with the updated update user?
    // assignment doesn't specify 
    function updateUser(userId, updatedUser){
        for (var u in users) {
            if (users[u]._id === userId) {
                users[u].firstName = updatedUser.firstName;
                users[u].lastName = updatedUser.lastName;
                users[u].username = updatedUser.username;
                users[u].password = updatedUser.password;
                users[u].email = updatedUser.email;
                return users[u];
            }
        }
        return null;
    }

    // accept an ID as an arguement, 
    // remove instance object from the correspond collection
    // whose ID property is equal to the ID arguement
    // question... are we supposed to 
    // respond with the the updated list?
    function deleteUser(userId){
        for (var u in users){
            if (users[u]._id === userId){
                users.splice(u, 1);
            }
        }
        return users;
    }

// Declare additional requirement specific to the User service

    // find user by username
    function findUserByUsername(username){
        for (var u in users) {
            if (users[u].username === username) {
                return users[u];
            }
        }
        return null;
    }

    // find user by credentials
    function findUserByCredentials(credentials){
        for (var u in users){
            if (users[u].username === credentials.username &&
                users[u].password === credentials.password){
                return users[u];
            }
        }
        return null;
    }

}
