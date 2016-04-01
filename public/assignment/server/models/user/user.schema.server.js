
//create a user schema so we can use Mongoose to store and retrieved data 
//from a MongoDB instance, instead of using mock data from the server instance

// create a mongoose variable so we can create a UserSchema 
var mongoose = require("mongoose");

module.exports = function () {

	// for now...using the description/sample as the default values
    var UserSchema = mongoose.Schema({
    	username: {type: String, default: "alice"},
        password: {type: String, default: "p@ssw0rd"}, 
        firstName: {type: String, default: "Alice"}, 
        lastName: {type: String, default: "Wonderland"}, 
        emails: {type: [String], default: ["alice@Wonderland.com", "alice@gmail.com"]}, 
        phones: {type: [String], default: ["123-234-4321", "234-432-2344"]}
    // "the collection should be called user"
    }, {collection: "user"});

    //return the Schema after we create it
    return UserSchema;
};

