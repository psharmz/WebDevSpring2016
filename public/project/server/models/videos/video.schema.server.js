module.exports = function (mongoose) {

    var VideoSchema = mongoose.Schema({
        date: String,
        title: String,
        class: String,
        owner: String,
        description: String, 
    }, {collection: "video"});

    return ScheduleSchema;
};





