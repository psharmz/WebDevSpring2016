//this allows us to have a responsive list of videos available

(function(){ 
    'use strict';
    angular
        .module("WaitWhatApp")
        .controller("VideoController", VideoController);

    function VideoController(VideoService, $routeParams) {

    	//don't use $scope use model instead, for best practices
        var model = this; 

        //event handler declarations will go here
        //so like search for videos functionality would go here

        function init() {
        	VideoService
        		.getAllVideos()
        		.then(function(videos){
        			model.videos = videos;
        		});
        }
        init(); 
        
}
})();

