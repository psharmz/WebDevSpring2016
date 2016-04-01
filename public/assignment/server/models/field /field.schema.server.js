
//create a field schema so we can use Mongoose to store and retrieved data 
//from a MongoDB instance, instead of using mock data from the server instance

// create a mongoose variable so we can create a UserSchema 
var mongoose = require("mongoose");

module.exports = function () {

	// for now...using the description/sample as the default values
    var FieldSchema = mongoose.Schema({
        label: {type: String, default: "First Name"}, 
        type: {type: String, 
        	enum: ["TEXT", 
        			"EMAIL", 
        			"PASSWORD", 
        			"OPTIONS", 
        			"DATE", 
        			"RADIOS", 
        			"CHECKBOXES"],
            default: "TEXT"},
        placeholder: { type: String, default: "Alice"}, 
        //the type is a an array of label/value pairs
        options: 
        		{type: [{label:String, value: String}], 
        		default: [{label:'Female', value: 'MALE'},
        					{label:'Female', value: 'FEMALE'}]
        		}, 
    }, {collection: "field"});

    //return the Schema after we create it
    return FieldSchema;
};









