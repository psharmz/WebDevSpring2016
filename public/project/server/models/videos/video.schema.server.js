module.exports = function (mongoose) {

    var VideoSchema = mongoose.Schema({
        date: String,
        title: String,
        class: String,
        professor: String,
        description: String, 
    }, {collection: "video"});

    return ScheduleSchema;
};





