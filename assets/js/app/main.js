(function () {
    "use strict";
    var blues = angular.module('blues', ['ui.bootstrap']);
    blues.controller('MainController', function ($scope, $modal, $http) {
        $scope.contacts = [];
        $http.get("http://localhost:1337/contact/").success(function (data) {
            $scope.contacts = data;
        });
        $scope.openNewContactEditor = function () {
            $modal.open({
                templateUrl: "templates/newContactEditor.html",
                controller: "NewContactEditorController",
                backdrop: 'static',
                size: 'lg',
                resolve: {
                }
            })
        }
        $scope.openDropdownEditor = function (label, name) {
            $modal.open({
                templateUrl: "templates/dropdownEditor.html",
                controller: "DropdownEditorController",
                backdrop: 'static',
                resolve: {
                    label: function () {
                        return label
                    },
                    name: function () {
                        return name
                    }
                }
            })
        }
    });
})()