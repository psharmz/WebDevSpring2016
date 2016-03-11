'use strict';

(function(){
    angular
        .module("WaitWhatApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

// as seen in the UML diagram, a user of WaitWhat can either be a student or a professor
// they cannot be both
// 

         var model = {
            users: [
                {"_id": 123, 
                "firstName": "Alice", 
                "lastName": "Wonderland",
                "username": "alice", 
                "password": "alice", 
                "role": "student",
                "classes": ["bio101"]},
                {"_id": 234, 
                "firstName": "Bob", 
                "lastName": "Hope",
                "username": "bob", 
                "password": "bob", 
                "role": "student", 
                "classes": ["psych101"]},
                {"_id": 345, 
                "firstName": "Charlie", 
                "lastName": "Brown",
                "username": "charlie", 
                "password": "charlie", 
                "role": "professor", 
                "classes": ["bio101", "psych101"]},
                {"_id": 456, 
                "firstName": "Dan", 
                "lastName": "Craig",
                "username": "dan", 
                "password": "dan", 
                "role": "student", 
                "classes": ["psych101"]},
                {"_id": 567, 
                "firstName": "Edward", 
                "lastName": "Norton",
                "username": "ed", 
                "password": "ed", 
                "role": "student", 
                "classes": ["bio101"]}
            ],

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers, 
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        }; 

        //once we have set up users[] and the functions, return the model
        return model; 

        //this is used during login to validate that a user exits
        function findUserByCredentials(username, password) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    if (model.users[u].password === password) {
                        //callback with the user found
                        return model.users[u]; 
                    } 
                }
            }
            //callback with no user found
            return null; 
        }

        //this is used during registration to create a new user
        function createUser(user) {
            //create the new user
            var user = {
                _id: (new Date).getTime(), 
                firstName: user.firstName,
                lastName: user.lastName, 
                username: user.username,
                password: user.password,

            }; 
            //and the created user to the list of users
            model.users.push(user);
            //callback returns user
            return user; 
        }

        function deleteUserById(userId) {
            //iterate through users[] to find the user with userId
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    //delete the user from users[]
                    model.users.splice(u, 1);
                }
            }
            //callback returns updated users[]
            return model.users;
        }

        function updateUser(userId, user) {
            //iterate through users to find the user with userId
            for (var u in model.users) {
                //if we find a match in our users array
                if (model.users[u]._id === userId) {
                    //update the user
                    var userRecord = model.users[u];
                    userRecord._id = user._id;
                    userRecord.firstName = user.firstName;
                    userRecord.lastName = user.lastName;
                    userRecord.username = user.username;
                    userRecord.password = user.password; 
                    //calls back with the updated user
                    return userRecord;
                } else {
                    //calls back with null if there is no user
                    return null; 
                }
            }

        }

        //not required for assignment but added it in because im lazy
        function getCurrentUser() {
            return $rootScope.currentUser;
        }

    }
})();




















