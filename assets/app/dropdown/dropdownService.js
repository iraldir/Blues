(function () {
    "use strict";
    var blues = angular.module('blues');
    blues.factory('dropdownService', function ($http, $q) {
        
        function Dropdown() {
            this.getCategories = function ($scope) {
                var promises = [];
                promises.push($http.get("http://localhost:1337/type/").success(function (data) {
                    $scope.types = data;
                }));
                promises.push($http.get("http://localhost:1337/genre/").success(function (data) {
                    $scope.genres = data;
                }));
                promises.push($http.get("http://127.0.0.1:1337/help/").success(function (data) {
                    $scope.helps = data;
                }));
                promises.push($http.get("http://localhost:1337/diverse1/").success(function (data) {
                    $scope.diverse1s = data;
                }));
                promises.push($http.get("http://localhost:1337/diverse2/").success(function (data) {
                    $scope.diverse2s = data;
                }));
                return $q.all(promises);
            };
        }

        // factory function body that constructs shinyNewServiceInstance
        return new Dropdown();
    });
})();