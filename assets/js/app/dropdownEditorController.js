(function () {
    "use strict";
    var blues = angular.module('blues');
    blues.controller("DropdownEditorController", function ($scope, $http, $log, name, label) {
        $scope.items = [];
        $scope.itemsToRemove = [];
        $scope.name = name;
        $scope.label = label;
        $scope.newName = "";
        $scope.createNewItem = function () {
            $scope.items.push({
                name: $scope.newName,
                oldName: $scope.newName
            });
            $scope.newName = "";
        };
        $scope.deleteItem = function(item){
            $scope.itemsToRemove.push(item);
            $scope.items.splice($scope.items.indexOf(item), 1);
        }
        $scope.save = function () {
            $scope.items.forEach(function (item) {
                if (item.id == undefined){
                    createItem(item);
                }
                if (item.oldName != item.name){
                    updateItem(item);
                }
            });
            if ($scope.newName){
                createItem({
                    name: $scope.newName
                });
            }
            $scope.itemsToRemove.forEach(function(item){
                destroyItem(item);
            });
            $scope.$close();
        };
        $scope.cancel = function(){
            $scope.$dismiss();
        }
        function createItem(item) {
            $http.get("http://localhost:1337/" + name + "/create?name="+item.name);
        }
        function updateItem(item){
            $http.get("http://localhost:1337/" + name + "/update/"+item.id+"?name="+item.name);
        }
        function destroyItem(item){
            $http.get("http://localhost:1337/" + name + "/destroy/"+item.id);
        }
        
        $http.get("http://localhost:1337/" + name + "/")
            .success(function (data) {
                $scope.items = data;
                $log.info($scope.empList);
            });
    });
})();