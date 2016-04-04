(function () {
    angular
        .module ("CapstoneApp")
        .controller ("HapYakController", HapYakController)


    function HapYakController ($sce) {

        var vm = this;
        var projectId = null; 
        var project_title = null; 
         //the videos 
        var videos = [
            33136, //123meh
            33121, //231ehm
            33122, //213emh
            33137, //132mhe
            33138, //312hme
            33139  //321hem 
        ];
        // the respective titles for each projectId 
        var title = {
            33136: '123meh',
            33121: '231ehm',
            33122: '213emh',
            33137: '132mhe',
            33138: '312hme',
            33139: '321hem'       
        };

        vm.safeRandomHapYakUrl = function safeRandomHapYakUrl() {
            
            projectId = videos[Math.floor(Math.random() * videos.length)];

            return $sce.trustAsResourceUrl("//www.hapyak.com/embed?key=dfd98f9f3a3c427fa552&project="+projectId);
            
        } 

        vm.videoTitle = function videoTitle() {

            if (projectId) {
                project_title = title[projectId];
            }

            return project_title; 
            

        

        }
    }

})();



