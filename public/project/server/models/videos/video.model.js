var q = require("q");

module.exports = function(db, mongoose) {
    // load video schema
    var VideoSchema = require("./video.schema.server.js")(mongoose);

    // create mongoose model
    var VideoModel = mongoose.model('Video', Videochema);

    var api = {
        createVideo: createVideo,
        findVideobyClassId: findVideobyClassId,
        deleteVideo: deleteVideo,
        updateVideo: updateVideo,
        findVideoById: findVideoById,
        findallVideos: findallVideos
    };
    return api;

    // create a new video, add return an updated list of videos 
    function createVideo(video){
        var deferred = q.defer();

        VideoModel.create(video, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    // get a list of videos for a class
    function findVideobyClassId(classId){
        var deferred = q.defer();

        VideoModel.find(
            {classId: classId},

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

                return null;
            });

        return deferred.promise;
    }

    // delete a video by Id
    function deleteVideo(videoId){
        return VideoModel.remove().where("_id").equals(videoId);
    }

    // update a video entry for a given video id 
    function updateVideo(videoId, updatedVideo){
        var deferred = q.defer();

        VideoModel.update(
            {_id: videoId},
            {   date: updatedVideo.date,
                title: updatedVideo.title,
                class: updatedVideo.class,
                professor: updatedVideo.professor,
                description: updatedVideo.description},

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    // find a video by id 
    function findVideoById(videoId){
        var deferred = q.defer();

        VideoModel.findById(videoId, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

            return null;
        });

        return deferred.promise;
    }

    // return all the videos 
    function findallVideos(){
        var deferred = q.defer();

        VideoModel.find(
            function (err, videos){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(videos);
                }

            }
        );

        return deferred.promise;
    }
}