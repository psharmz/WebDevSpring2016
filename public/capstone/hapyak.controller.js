(function () {
    angular
        .module ("CapstoneApp")
        .controller ("HapYakController", HapYakController)


    function HapYakController ($sce) {

        var vm = this;
        var projectId = null; 

        vm.safeRandomHapYakUrl = function safeRandomHapYakUrl() {
            
            var videos = [
                '32974',
                '32976',
                '32977',
                '32981',
                '32979',
                '32980'
            ];

            projectId = videos[Math.floor(Math.random() * videos.length)];

            return $sce.trustAsResourceUrl("//www.hapyak.com/embed?key=dfd98f9f3a3c427fa552&project="+projectId);
            
        } 

        vm.videoTitle = function videoTitle() {

            if (projectId) { 

                if (projectId == "32974") {
                    return '321hem'; 
                }

                else if (projectId == "32976") {
                    return '312hme';
                }
                else if (projectId == "32977") {
                    return '231ehm';

                }
                else if (projectId == "32981") {
                    return '123meh';

                }
                else if (projectId == "32979") {
                    return '213emh';
                }

                else if (projectId == "32980") {
                    return '132mhe';
                }

                else return null; 
            }

            else return null; 

        }
    }

})();



