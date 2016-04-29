var q = require("q");

module.exports = function(db, mongoose){
    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create mongoose model
    var userModel = mongoose.model('Player', UserSchema);

    var api = {

        // implement CRUD 
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByName: findUserByName,
        searchUserByName: searchUserByName
    };
    return api;

    // create a new user from information taken in, return all
    function createUser(user){
        var deferred = q.defer();

        // insert a new user into the database
        UserModel.create(user, function(err, doc){
            console.log(doc);

            if (err){
                // reject promise
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    // get all of the users
    function findAllUsers(){
        var deferred = q.defer();

        UserModel.find(
            function (err, users){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }

            }
        );

        return deferred.promise;
    }

    function findUserById(id){
        var deferred = q.defer();

        UserModel.findById(id, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

            return null;
        });

        return deferred.promise;
    }

    // find user by email and password
    function findUserByCredentials(credentials){
        var deferred = q.defer();

        UserModel.findOne(
            // first argument is predicate
            { username: credentials.email,
                password: credentials.password },

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

                return null;
            });

        return deferred.promise;
    }

    // update the given user
    function updateUser(userId, updatedUser){
        var deferred = q.defer();

        UserModel.update(
            {_id: userId},
            {   firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                password: updatedUser.password },
                //type is not included because you can update to being a student to a professor 
                

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    // delete a user
    function deleteUser(userId){
        return UserModel.remove().where("_id").equals(userId);
    }

    // find a user by their first and last name for search
    function findUserByName(firstName, lastName){
        var deferred = q.defer();

        UserModel.findOne(
            // first argument is predicate
            {   firstName: firstName,
                lastName: lastName },

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

                return null;
            });

        return deferred.promise;
    }

    // search for users
    function searchUserByName(firstName, lastName){
        var deferred = q.defer();

        var predicate = {};
        if (lastName === ""){
            predicate = {firstName: firstName};
        } else {
            predicate = {firstName: firstName, lastName: lastName};
        }

        UserModel.find(
            // first argument is predicate
            predicate,

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

                return null;
            });

        return deferred.promise;
    }

}