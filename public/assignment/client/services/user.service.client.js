(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http){

        //use the api to retrieve data from server
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            findUserByUsername: findUserByUsername
        };
        return api;

        // send a http post to create new user
        function createUser (user) {
            return $http.post ("/api/assignment/user", user);
        }

        // send http get to find a user by their credentials
        function findUserByCredentials(username, password) {
            return $http.get ("/api/assignment/user?username=" + username + "&password=" + password);
        }

        // send http put request to update a user for an id 
        function updateUser (userId, user) {
            return $http.put ("/api/assignment/user/" + userId, user)
        }

        // send http get request to find user by their username
        function findUserByUsername(username){
            return $http.get ("/api/assignment/user?username=" + username);
        }

        // send http get request to view all users 
        function findAllUsers(){
            return $http.get ("/api/assignment/user");
        }

        // send http delete to remove a user by userid 
        function deleteUserById(userId){
            return $http.delete ("/api/assignment/user/" + userId);
        }

    }
})();






















