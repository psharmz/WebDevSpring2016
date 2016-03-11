//this file adds all the CRUD functionality for videos

'use strict';

(function(){
    angular
        .module("WaitWhatApp")
        .factory("VideoService", VideoService);

    function VideoService($rootScope) {

        //set up the model to include all videos and functions
        var model = {
            videos: [
                {"Title": "Intro to Bio", 
                "Class": "Bio101",
                "Duration": "37 min",
                //the analytics portion is a placeholder for now 
                "Analytics": 123},
                {"Title": "Intro to Psych", 
                "Class": "Psych101",
                "Duration": "13 min", 
                //the analytics portion is a placeholder for now 
                "Analytics": 456},
                {"Title": "Bio Lecture 2", 
                "Class": "Bio101",
                "Duration": "13 min", 
                //the analytics portion is a placeholder for now 
                "Analytics": 789}
            ], 

        createVideoForProfessor: createVideoForProfessor

        };

        //once we have set up the model with forms[] and functions, return
        return model;  

        //CREATES a new video for a Professor, given the Title and Class
        function createVideoForProfessor(title, Class, video) {
            var video = {
                "Title": title,
                "Class" : Class
            };
            model.videos.push(video);
            //calls back with the form that was just created
            return video; 
        }

        //READS (or finds) all the videos for a class given the class Name
        function findAllVideosForClass(Class) {
            var videosForClass = []; 
            for (var u in model.videos) {
                if (model.videos[u].Class === Class) {
                    videosForClass.push(model.videos[u]);
                }
            }
            //call back with array of forms for the ser
            return videosForClass; 
        }

        //UPDATE a Video Entry by finding it by title
        function updateVideoByTitle(Title, newVideo) {
            for (var u in model.videos) {
                if (model.videos[u].Title === Title) {
                    var videoInRecord = model.videos[u];
                    videoInRecord.Class = newVideo.Class; 
                    videoInRecord.Duration = newVideo.Duration;
                    videoInRecord.Analytics = newVideo.Analytics;
                }
            }

            //calls back with updated form
            return videoInRecord; 
        }

        //DELETE a video given the the video title
        function deleteVideoById(Title) {
            for (var u in model.videos) {
                if (model.videos[u].Title === Title) {
                    model.videos.splice(u, 1);
                }
            }
            //calls back with array of forms
            return model.videos; 

        }

    }
})();
