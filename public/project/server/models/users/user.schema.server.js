module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: String,                                                               
        // a user can either be a student or professor  
        type: {type:String, default:"student"}
    }, {collection: "student"});

    return UserSchema;
};