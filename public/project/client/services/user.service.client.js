//implementation for the UserService (client side)
//this is used to look up if a user exists in the db
//can be used to log in a user successfullly

(function() {
    'use strict';

    angular
        .module("WaitWhatApp")
        .factory("UserService", UserService);

    function UserService($http){
        var model = {
            // used to log in an existing user 
            findUserByCredentials: findUserByCredentials,
    		// to find a user by email
            findUserByEmail: findUserByEmail,
            // to register a new user
            createUser: createUser, 
            // to update user information (this will be implemented later)
            updateUser: updateUser, 
            // to delete an account
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers
           
        };

        return model;

        function findUserByCredentials(email, password) {
            return $http.get ("/api/project/user?email=" + email + "&password=" + password);
        }

        function findUserByEmail(email){
            return $http.get ("/project/project/user?email=" + email);
        }

        function createUser (user) {
            return $http.post ("/api/project/user", user);
        }

        function deleteUserById(userId){
            return $http.delete ("/api/project/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put ("/api/project/user/" + userId, user)
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

    }
})();

