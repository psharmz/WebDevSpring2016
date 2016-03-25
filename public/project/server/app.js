module.exports = function (app) {
	//right now we just have the user model but ill add the video and class model later 
    var userModel = require("./models/user.model.js")();
    
    var userService = require("./services/user.service.server.js")(app, userModel);
};