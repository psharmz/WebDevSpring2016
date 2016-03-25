// we want the data to live on the server side. When we need to check something against the db, the user model is used
// videoModel is server side and is used by the video service(also server side)
// the model is used by the service so it can send a correct res

var mock = require("./video.mock.json");
var uuid = require('node-uuid');

//this api should correlate to the one that is one the client side 
module.exports = function(){
    var api = {
        createVideo: createVideo,
        findAllVideos: findAllVideos,
        findVideosById: findVideosById,
        findVideoByTitle: findVideoByTitle,
        findVideosByClass: findVideosByClass,
        updateVideo: updateVideo,
        deleteVideo: deleteVideo
    };
    return api;

    // create a new user from information taken in, return all
    function createVideo(video){
        user._id = uuid.v1();
        mock.push(user);
        return user;
    }

    // get all of the videos
    function findAllVideos(){
        return mock;
    }

    // takes in id and finds videos with that id
    function findVideosById(id){
        for (var u in mock) {
            if (mock[u]._id === id) {
                return mock[u];
            }
        }
        return null;
    }

    // find a video by the title
    function findVideoByTitle(title){
        for (var u in mock) {
            if (mock[u].title === title) {
                return mock[u];
            }
        }
        return null;
    }

    // find all the videos for a particular course
    function findVideosByClass(course) {
        for (var u in mock) {
            if (mock[u].course === course) {
                return mock[u];
            }
        }
        //right now it only returns the first course, 
        //but may change this later so that it returns all the courses
        return null; 
    }

  

    // update the video information
    function updateVideo(videoId, updatedVideo){
        for (var u in mock) {
            if (mock[u]._id === videoId) {
                mock[u].title = updatedVideo.title;
                mock[u].course = updatedVideo.course;
                mock[u].upload_date = updatedVideo.upload_date;
                return mock[u];
            }

        }
        //return the updated video object or return null 
        return null;
    }

    // delete a user
    function deleteVideo(videoId){
        for (var u in mock){
            if (mock[u]._id === videoId){
                mock.splice(u, 1);
            }
        }
        return mock;
    }
    
}