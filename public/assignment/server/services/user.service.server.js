var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require("mongoose");


//take in the the Model as an arguement so we can CRUD the data 
module.exports = function(app, userModel){

// user service endpoints 

    //assignment 5 add new endpoints
    var auth = authenticated;

    //configure passport local strategy to intercept POST api/assignment/login
    app.post("/api/assignment/login", passport.authenticate('local'), login);

    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post('/api/assignment/register', register);

    //refactor existing user Web service to support admin use cases
    //these endpoints allow admin users to create, read, update, and delete users
    app.post("/api/assignment/admin/user", createUser);
    app.get("/api/assignment/admin/user", findAllUser);
    app.get("/api/assignment/admin/user/:userid", findByIdUser);
    app.delete("/api/assignment/admin/user/:userid", deleteUser);
    app.put("/api/assignment/admin/user/:userid", updateUser);
    
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //implement strategies

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    // request to create user and respond with all users
    function createUser(req, res){
        var newUser = req.body;
        // use the userModel to create a User using the api 
        // the api will 
        var users = userModel.createUser(newUser);
        res.json(users);
    }

    // request to read all users and respond with all users
    function findAllUser(req, res){
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    // request find a user with a specific id and respond with that user
    function findByIdUser(req, res){
        var id = req.params.id;
        var user = userModel.findUserById(id);
        res.json(user)
    }


    // request to update a user with body 
    // parse the id from the URL
    // update the user with that id with new body
    // respond with the updated user instance
    function updateUser(req, res){
        var updatedUser = req.body;
        var id = req.params.id;
        var users = userModel.updateUser(id, updatedUser);
        res.json(users);
    }

    //request to read to delete particular User (check id)
    //respond with the updated list of users
    function deleteUser(req, res){
        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    //implement new endpoints: login, loggedin, logout, register

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    //implement a middleware function isAdmin() to intercept all admin Web Services
    //verifies user is logged in
    //verifies user in admin role
    //if either is false, then respond with a 403
    //if both are true, then invoke callback next()

    function isAdmin (req, res, next) {
        user = req.user
        if (user.roles.indexOf("admin") < 1) {
            res.send(403);
        } else if (!req.isAuthenticated()) {
            res.send(403); 
        }
        } else {
            next();
        }
    }

    function authenticated (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

}


