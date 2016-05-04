
// //create a form schema so we can use Mongoose to store and retrieved data 
// //from a MongoDB instance, instead of using mock data from the server instance

// // create a mongoose variable so we can create a FormSchema 
// var mongoose = require("mongoose");

// module.exports = function (mongoose) {

// 	//we need the field scheme to create the form schema since it
// 	//stored the embedded instances of fields

//     var FieldSchema = require("../field/field.schema.server.js")(mongoose);

// 	// for now...using the sample as the default values
//     var FormSchema = mongoose.Schema({
//     	//only has description for userId, no default
//     	userId: {type: String},
//         title: {type: String, default: "New Form"},
//         //only has description for userId, no default
//         fields: [FieldSchema],
//         //default is current date
//         created: {type: Date, default: Date.now},
//         //default is current date 
//         update:  {type: Date, default: Date.now}
//     // "the collection should be called form"
//     }, {collection: "form"});

//     //return the Schema after we create it
//     return FormSchema;
// };
module.exports = function (mongoose) {

    var FieldSchema = require("../field/field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: "New Form"},
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        update:  {type: Date, default: Date.now}
    }, {collection: "form"});

    return FormSchema;
};

