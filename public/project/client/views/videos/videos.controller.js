//this allows us to have a responsive list of videos available during professor login 

(function(){
    'use strict';

    angular
        .module("WaitWhatApp")
        .controller("VideoController", VideoController);

    function VideoController($rootScope, $scope, $location, VideoService){


        $scope.selectVideo = selectVideo; 
        $scope.updateVideo = updateVideo;
        $scope.getallVideos = getallVideos;


        if ($rootScope.currentUser){
            $scope.userId = $rootScope.currentUser._id;
            $scope.email = $rootScope.currentUser.email; 
        }

        // get the professors' exisiting videos 
        if ($scope.email){
            ScheduleService
                .getallVideos()
                .then(getallVideosResponse);
        }

        function getallVideosResponse(videos){
            if (videos.data){
                // go through the videos and only show the ones that this professor owns
                var videoList = videos.data;
                var profList = [];
                for (var v in videoList){
                    if (videoList[v].owner === $scope.email) {
                        profList.push(videoList[v]); 
                    }
                }

                $scope.videos = profList; 
                formatData();
            }
        }

        // format date properly 
        function formatDate() {
            var date;
            for (var s in $scope.videos) {
                date = new Date($scope.videos[s].date);
                $scope.videos[s].formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            }
        }


        function updateVideo(video) {
            if ($scope.selectedVideoIndex != null){
                var userAvail = {
                    data: video.data,
                    userId: $scope.currentUser._id,
                    videoId: $scope.videos[$scope.selectedVideoIndex]._id
                }

                if ($scope.videos[$scope.selectedVideoIndex].title != null){
                    VideoService
                        .updateVideo(userAvail)
                        .then(updateVideoResponse);
                } 
            }
        }

        function updateVideoResponse(update) { 
            if (update.data){
                $scope.message = "Video Entry was successfully updated";
                //reset to no selection
                $scope.video = {};
                $scope.selectedVideoIndex = null;
                //redisplay all videos 
                getallVideos();
            } else {
                $scope.error = "Error updating video entry";
            }
        }


        // select a video entry and put information in first row
        // update the video information when edited
        function selectVideo(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedVideoIndex = index;

            $scope.video = {
                date : $scope.videos[index].formattedDate,
                title : $scope.videos[index].title,
                class : $scope.videos[index].class,
                description : $scope.videos[index].description
            };

        }

   

    }
})();