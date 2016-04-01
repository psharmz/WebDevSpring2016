// client side service will talk to server side service to retrieve data from model via $http 
(function() {
    
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http){
        var api = {
            //CRUD
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
        };
        return api;

        function createUser (user) {
            return $http.post ("/api/assignment/user", user);
        }

        function findUserByCredentials(username, password) {
            return $http.get ("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username){
            return $http.get ("/api/assignment/user?username=" + username);
        }

        function findAllUsers(){
            return $http.get ("/api/assignment/user");
        }

        function updateUser (userId, user) {
            return $http.put ("/api/assignment/user/" + userId, user)
        }

        function deleteUserById(userId){
            return $http.delete ("/api/assignment/user/" + userId);
        }

    }
})();