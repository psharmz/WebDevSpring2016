module.exports = function(app, userModel){


    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUser);
    app.get("/api/assignment/user/:id", findByIdUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function updateUser(req, res){
        var index = req.params.id;
        users[index] = req.body;
        res.json(courses);
    }

    // accept an ID as an arguement, 
    // remove instance object from the correspond collection
    // whose ID property is equal to the ID arguement
    // question... are we supposed to 
    // respond with the list of updated courses?
    function deleteUser(req, res){
        var index = req.params.id;
        users.splice(index, 1);
        res.json(courses);
    }


    // should take an ID as an arguement, find an instance object
    // whose ID matches the arguement and return the instance
    // return null otherwise 
    function findById(req, res){
        var id = req.params.id;
        var user = userModel.findUserById(id);
        res.json(user)
    }

    // take ID and oject instance as arguements
    // find the object instance in the corresponding collection
    // whose ID property is equal to the ID arguement
    // update the found instance with property values in the 
    // arguement instance object 
    function update(req, res){
        var updatedUser = req.body;
        var id = req.params.id;
        var user = userModel.updateUser(id, updatedUser);
        res.json(user);
    }

    // accept an ID as an arguement, 
    // remove instance object from the correspond collection
    // whose ID property is equal to the ID arguement
    function delete(req, res){
        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);
    }


// Declare additional requirement specific to the User service

    function findUserByUsername(req, res){
        var username = req.params.username;
        console.log(username);
        if (username == null){
            res.json(null);
        } else {
            // this is probably wrong. change this later
            res.json(users[username]);
        }

    }
    function findUserByCredentials(req, res){
        var credentials = req.params.credentials;
        console.log(credentials);
        if (credentials == null){
            res.json(null);
        } else {
            // this is probably wrong. change this later
            res.json(users[credentials]);
        }
    }