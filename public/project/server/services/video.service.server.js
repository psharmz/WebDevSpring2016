// This is the VideoService SERVER SIDE

module.exports = function(app, VideoModel){

// implement the crud operations
    app.post("/api/project/video", createVideo);
    app.get("/api/project/video", findVideos);
    app.get("/api/project/video/:id", findVideoById);
    app.put("/api/project/video/:id", updateVideo);
    app.delete("/api/project/video/:id", deleteVideo);



        updateVideo: updateVideo,
        findallVideos: findallVideos

    // find a video with a specific id
    function findVideoById(req, res){
        var id = req.params.id;

        VideoModel.findVideoById(id)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    // create video and return all videos
    function createVideo(req, res){
        var video = req.body;
        var newVideo = videoModel.createVideo(video);
        res.json(newVideo);
    }

    // get and return all the videos or get and return all videos for a particular class 
    function findVideos(req, res){
        var title = req.query.title;
        var courseid = req.query.course;
        // if the client side service sent a get request with title and/or course
        // it means they are trying to find a video that matches those...use the model 
        // to find the videos after parsing the URL 
        if (courseid){
            // find all the videos for a course
            videoModel.findVideobyClassId(courseId)
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            videoModel.findallVideos()
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
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

    // delete a video and return the rest of the videos
    function deleteVideo(req, res){
        var id = req.params.id;
        var remaining = videoModel.deleteVideo(id);
        res.json(remaining);
    }
}