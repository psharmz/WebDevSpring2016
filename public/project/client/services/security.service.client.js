(function(){
    angular
        .module("WaitWhatApp")
        .factory("SecurityService", SecurityService);

    function SecurityService($http) {
        var api = {
            register: register,
            login: login,
            logout: logout
            
        };
        return api;

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }
       
    }
})();