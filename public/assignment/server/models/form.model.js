//implement the javascript node.js module for Form

module.exports = function(app, userModel){

    //apis to manipulate all the data...follow CRUD

    // C for create --> post
    app.post("/api/assignment/user", create);

    // R for read --> get
        // return the collection
    app.get("/api/assignment/user", findAll);
        // return a single instance found, null otherwise 
    app.get("/api/assignment/user/:id", findById);
    
    // U for update --> put
    app.put("/api/assignment/user/:id", update);

    // D for delete --> delete
    app.delete("/api/assignment/user/:id", delete);


    // accept the instance object,
    // add it to the collection,
    // and return it to the collection
    function create(req, res){
        var user = req.body;
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }

    // take no arguements and return the collection
    function findAll(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username && password){
            var credentials = {
              username: username,
              password: password
            };
            
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
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
}