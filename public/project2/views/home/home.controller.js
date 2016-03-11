// home.controller.js

(function(){
    angular
        .module("WaitWhatApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;
    }
})();