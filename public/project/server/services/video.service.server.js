// This is the VideoService SERVER SIDE

module.exports = function(app, videoModel){

// implement the crud operations
    app.post("/api/project/video", createVideo);
    app.get("/api/project/video", findVideos);
    app.get("/api/project/video/:id", findVideoById);
    app.put("/api/project/video/:id", updateVideo);
    app.delete("/api/project/video/:id", deleteVideo);

    // create video and return all videos
    function createVideo(req, res){
        var video = req.body;
        var newVideo = videoModel.createVideo(video);
        res.json(newVideo);
    }

    // get and return all videos
    function findVideos(req, res){
        var title = req.query.title;
        var course = req.query.course;
        // if the client side service sent a get request with title and/or course
        // it means they are trying to find a video that matches those...use the model 
        // to find the videos after parsing the URL 
        if (title){
            //find a video by title
            var video = videoModel.findVideoByTitle(title);
            res.json(video);
        } else if (course){
            //find a video by course (right now only returns one of th videos)
                var video = videoModel.findVideosByCourse(course);
                res.json(video);
            } else {
                //otherwise, just return all the videos 
                var videos = videoModel.findAllVideos();
                res.json(videos);
            }
        }

    // find a video with a specific id
    function findVideoById(req, res){
        var id = req.params.id;
        var video = videoModel.findVideoById(id);
        res.json(video)
    }

    // update a video 
    function updateVideo(req, res){
        var updatedVideo = req.body;
        var id = req.params.id;
        var video = videoModel.updateVideo(id, updatedVideo);
        res.json(video);
    }

    // delete a video
    function deleteVideo(req, res){
        var id = req.params.id;
        var users = videoModel.deleteVideo(id);
        res.json(users);
    }
}