//take in the the Model as an arguement so we can CRUD the data 
module.exports = function(app, userModel){

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUser);
    app.get("/api/assignment/user/:id", findByIdUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


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
        // parse the URL for the username
        // parse the URL for the password 
        var username = req.query.username;
        var password = req.query.password;
        // if there was a username and password in the URL
        if (username && password){
            //save it as a 'credentials' object
            var credentials = {
              username: username,
              password: password
            };
            var users = userModel.findUserByCredentials(credentials);
            res.json(users);
        } else if (password == null){
            if (username){
                var user = userModel.findUserByUsername(username);
                res.json(user);
            } else {
                var users = userModel.findAllUsers();
                res.json(users);
            }
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
}


