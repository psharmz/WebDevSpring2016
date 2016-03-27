(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope){

        //model consits of lists of users and the implementations
        var model = {

            //declare empty array 
            var users = []; 

            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ],

            //CRUD 
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUserById: deleteUserById
        };

        //return the model 
        return model;
     
        //write out the functions in the model below 

         //callback with the user that was just added 
        //before we call createUser we should check if the user already exits
        //this is done in the controller???
        function createUser (user, callback) {
            var user = {
                _id: (new Date).getTime(),
                firstname: user.firstName,
                lastname: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email: user.email
            };
            model.users.push(user);
            callback(user);
        }

        function findUserByCredentials(username, password, callback) {
            var user = null;
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    // we found a user
                    user = model.users[u];
                }
            }
            //return the user in the callback 
            callback(user);
        }

        //callback with the list of users
        function findAllUsers(callback){
            callback(model.users);
        }


        // callback with updated user if found or null otherwise (userid does not exist)
        function updateUser (userId, user, callback) {
            var updated = null;
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u].firstname = user.firstName;
                    model.users[u].lastname = user.lastName;
                    model.users[u].username = user.username;
                    model.users[u].password = user.password;
                    model.users[u].roles = user.roles;
                    updated = model.users[u];
                }
            }
            callback(updated);
        }

       
        //callback with the list of users after deletion 
        function deleteUserById(userId, callback){
            for (var u in model.users){
                if (model.users[u]._id === userId){
                    model.users.splice(u, 1);
                }
            }
            callback(model.users);
        }

    }
    
})();