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
            findByIdUser: findByIdUser,
            findAllUser: findAllUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            //new added
            login: login,
            logout: logout,
            loggedin: loggedin, 
            register: register
        };
        return api;


    //refactor existing user Web service to support admin use cases
    //these endpoints allow admin users to create, read, update, and delete users

        function login (user) {
            return $http.post("/api/assignment/login/" + user);
        }

        function loggedin() {
            return $http.get("/api/assignment/loggedin"); 
        } 

        function findByIdUser (userId) {
            return $http.get("/api/assignment/admin/user/" +  userId);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function createUser (user) {
            return $http.post ("/api/assignment/admin/user", user);
        }

        function findUserByCredentials(username, password) {
            return $http.get ("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username){
            return $http.get ("/api/assignment/user?username=" + username);
        }

        function findAllUser(){
            return $http.get ("/api/assignment/admin/user");
        }

        function updateUser (userId, user) {
            return $http.put ("/api/assignment/admin/user/" + userId, user)
        }

        function deleteUserById(userId){
            return $http.delete ("/api/assignment/admin/user/" + userId);
        }

    }
})();