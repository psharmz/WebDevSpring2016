// This is the VideoService CLIENT SIDE

//implementation for the VideoService (client side)
//this is used to look up if a video exists in the db
//can be used to log in a video successfullly

(function() {
    'use strict';

    angular
        .module("WaitWhatApp")
        .factory("VideoService", VideoService);

    function VideoService($http){
        var api = {
            // used to search for a particular video 
            findVideoByTitle: findVideoByTitle,
    		// find all the videos for a particular course
            findVideoByCourse: findVideoByCourse,
            // to create a new Video 
            createVideo: createVideo, 
            // to update video information (this will be implemented later)
            updateVideo: updateVideo, 
            // to delete a video  
            deleteVideo: deleteVideo,
            // to get all the videos
            getAllVideos: getAllVideos
        };

        return api;

        function findVideoByTitle(course, title) {
            return $http.get ("/api/project/video?title=" + title);
        }

        function findVideoByCourse(course){
            return $http.get ("/project/project/video?course=" + course);
        }

        function getAllVideos() {
        	return $http.get ("/api/project/video?");
        }

        function createVideo (video) {
            return $http.post ("/api/project/video", video);
        }

        function deleteVideo(userId){
            return $http.delete ("/api/project/video/" + userId);
        }

        function updateVideo (userId, video) {
            return $http.put ("/api/project/video/" + userId, video)
        }

    }
})();

