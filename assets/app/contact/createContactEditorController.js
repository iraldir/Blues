(function () {
    "use strict";
    var properties = ["title", "firstName", "lastName", "companyName", "adress", "complementoryAdress", "postalCode", "city", "homePhone", "mobilePhone", "officePhone", "email", "birthday", "adherent", "benevole", "donor", "type", "genre", "help", "role", "diverse1", "diverse2", "comments"];
    var blues = angular.module('blues');
    blues.controller("NewContactEditorController", function ($scope, $http, $log, contact, openDropdownEditor, dropdownService) {
        $scope.title = "Monsieur";
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.companyName = "";
        $scope.adress = "";
        $scope.complementoryAdress = "";
        $scope.postalCode = "";
        $scope.city = "";
        $scope.homePhone = "";
        $scope.mobilePhone = "";
        $scope.officePhone = "";
        $scope.email = "";
        $scope.birthday = "";
        $scope.adherent = false;
        $scope.benevole = false;
        $scope.donor = false;
        $scope.type = null;
        $scope.genre = null;
        $scope.help = null;
        $scope.role = null;
        $scope.diverse1 = null;
        $scope.diverse2 = null;
        $scope.comments = "";


        if (contact) {
            $scope.editMode = true;
            $scope.id = contact.id;
            properties.forEach(function (property) {
                if (contact[property]) {
                    if (contact[property].id) {
                        $scope[property] = contact[property].id;
                    } else {
                        $scope[property] = contact[property];
                    }
                }
            });
        }
        $scope.refresh = function () {
            var dropdownFields = ["type", "genre", "help", "diverse1", "diverse2"];
            
            dropdownFields.forEach(function(field){
                if ($scope[field] && $scope[field].id){
                    $scope[field] = $scope[field].id;
                }
            });
            
            dropdownService.getCategories($scope).then(function(){
                dropdownFields.forEach(function(field){
                    var fields = field + "s";
                    if(!$scope[field] && !$scope.editMode){
                        $scope[field] = $scope[fields][0];
                    } else if (typeof $scope[field] === "number"){
                        var realField = $scope[fields].filter(function (t){
                            return t.id === $scope[field];
                        })[0];
                        if (realField){
                            $scope[field] = realField;
                        }
                    }
                });
            });
        };
        $scope.openDropdownEditor = function () {
            openDropdownEditor.apply(null, arguments).result.then(function () {
                $scope.refresh();
            });
        };
        $scope.cancel = function () {
            $scope.$dismiss();
        };
        $scope.save = function () {
            var args = "";
            properties.forEach(function (property) {
                if ($scope[property]) {
                    args += property;
                    args += "=";
                    if ($scope[property].id) {
                        args += $scope[property].id;
                    } else {
                        args += $scope[property];
                    }
                    args += "&";
                }
            });

            if (args) {
                args = args.substring(0, args.length - 1);
                var method = "";
                if ($scope.editMode) {
                    method = "update/" + $scope.id + "?";
                } else {
                    method = "create?";
                }
                $http.get("/contact/" + method + args).success(function () {
                    $scope.$close();
                });
            }
        };
        $scope.refresh();
    });
})();