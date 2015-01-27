(function () {
    "use strict";
    var blues = angular.module('blues');
    blues.controller("DropdownEditorController", function ($scope, $http, $log, $q, name, label) {
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
        };
        $scope.save = function () {
            var promises = [];
            $scope.items.forEach(function (item) {
                if (item.id === undefined){
                    promises.push(createItem(item));
                }
                if (item.oldName !== item.name){
                    promises.push(updateItem(item));
                }
            });
            if ($scope.newName){
                promises.push(createItem({
                    name: $scope.newName
                    }));
            }
            $scope.itemsToRemove.forEach(function(item){
               promises.push( destroyItem(item));
            });
            $q.all(promises).then(function(){
                $scope.$close();
            });
        };
        $scope.cancel = function(){
            $scope.$dismiss();
        };
        function createItem(item) {
            return $http.get("http://localhost:1337/" + name + "/create?name="+item.name);
        }
        function updateItem(item){
            return $http.get("http://localhost:1337/" + name + "/update/"+item.id+"?name="+item.name);
        }
        function destroyItem(item){
            return $http.get("http://localhost:1337/" + name + "/destroy/"+item.id);
        }
        
        $http.get("http://localhost:1337/" + name + "/")
            .success(function (data) {
                $scope.items = data.map(function(category){
                    category.oldName = category.name;
                    return category;
                })
                $log.info($scope.empList);
            });
    });
})();