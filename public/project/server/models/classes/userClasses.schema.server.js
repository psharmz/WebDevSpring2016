module.exports = function (mongoose) {

    var EnrolledSchema = mongoose.Schema({
        userId: String,
        classId: String,
        professor: String, 
    }, {collection: "classId"});

    return EnrolledSchema;
};



      