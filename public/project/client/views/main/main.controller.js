(function(){ 
	'use strict';

    angular
    	.module("WaitWhatApp")
        .controller("MainController", MainController);

    function MainController($location, $scope) {
        $scope.$location = $location;
    }
})();