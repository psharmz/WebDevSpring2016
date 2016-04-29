(module.exports = function (app, db, mongoose) {

	//include the models for users, enrollment, and videos
    var userModel = require("./models/users/user.model.js")(db, mongoose);
    var EnrolledModel = require("./models/classes/userClasses.model.js")(db, mongoose);
    var VideoModel = require("./models/videos/video.model.js")(db, mongoose);

    //inclue the services to manage users, enrollment, and videos 
    var userService = require("./services/user.service.server.js")(app, userModel);
    var enrollmentService = require("./services/enrollment.service.server.js")(app, EnrolledModel);
    var videoService = require("./services/video.service.server.js")(app, VideoModel);
};