// This is the UserService SERVER SIDE

module.exports = function(app, userModel){

// implement the crud operations
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUsers);
    //app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    // create user and return all users
    function createUser(req, res){
        var user = req.body;
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }

    // get and return all users
    function findUsers(req, res){
        var email = req.query.email;
        var password = req.query.password;
        // if the client side service sent a get request with username and password
        // in the url it means we are trying to find the user by credentials
        // use the model to do so 
        if (email && password){
            var credentials = {
              email: email,
              password: password
            };
            
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        } else if (password == null){
            if (email){
                var user = userModel.findUserByUsername(email);
                res.json(user);
            } else {
                var users = userModel.findAllUsers();
                res.json(users);
            }
        }
    }

    // find a user with a specific id
    function findUserByEmail(req, res){
        var id = req.params.id;
        var user = userModel.findUserByEmail(id);
        res.json(user)
    }

    // update a user
    function updateUser(req, res){
        var updatedUser = req.body;
        var id = req.params.id;
        var user = userModel.updateUser(id, updatedUser);
        res.json(user);
    }

    // delete a user
    function deleteUser(req, res){
        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);
    }
}