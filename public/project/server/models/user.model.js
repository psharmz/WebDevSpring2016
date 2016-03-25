// we want the data to live on the server side. When we need to check something against the db, the user model is used
// userModel is server side and is used by the user service(also server side)
// the model is used by the service so it can send a correct res

var mock = require("./user.mock.json");
var uuid = require('node-uuid');

//this api should correlate to the one that is one the client side 
module.exports = function(){
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByEmail: findUserByEmail,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    // create a new user from information taken in, return all
    function createUser(user){
        user._id = uuid.v1();
        mock.push(user);
        return user;
    }

    // get all of the users
    function findAllUsers(){
        return mock;
    }

    // takes in id and finds user with that id
    function findUserById(id){
        for (var u in mock) {
            if (mock[u]._id === id) {
                return mock[u];
            }
        }
        return null;
    }

    // find a user by their email
    function findUserByEmail(email){
        for (var u in mock) {
            if (mock[u].email === email) {
                return mock[u];
            }
        }
        return null;
    }

    // find user based on their email and password
    function findUserByCredentials(credentials){
        for (var u in mock){
            if (mock[u].email === credentials.email &&
                mock[u].password === credentials.password){
                return mock[u];
            }
        }
        return null;
    }

    // update the given user
    function updateUser(userId, updatedUser){
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u].firstName = updatedUser.firstName;
                mock[u].lastName = updatedUser.lastName;
                mock[u].email = updatedUser.email;
                mock[u].password = updatedUser.password;
                mock[u].role = updatedUser.role;
                return mock[u];
            }

        }
        return null;
    }

    // delete a user
    function deleteUser(userId){
        for (var u in mock){
            if (mock[u]._id === userId){
                mock.splice(u, 1);
            }
        }
        return mock;
    }
    
}