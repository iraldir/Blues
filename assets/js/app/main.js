(function () {
    "use strict";
    var blues = angular.module('blues', ['ui.bootstrap']);
    blues.controller('MainController', function ($scope, $modal, $http) {
        $scope.contacts = [];
        $http.get("http://localhost:1337/contact/").success(function (data) {
            $scope.contacts = data;
        });
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
            });
        };
        $scope.openNewContactEditor = function () {
            $modal.open({
                templateUrl: "templates/newContactEditor.html",
                controller: "NewContactEditorController",
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    contact: function(){
                            return undefined;
                        },
                        openDropdownEditor: function(){
                            return $scope.openDropdownEditor;
                        }
                }
            })
        };
        $scope.openEditContactEditor = function () {
           var contact = $scope.contacts[$scope.activeRow];
            if (contact){
                $modal.open({
                    templateUrl: "templates/newContactEditor.html",
                    controller: "NewContactEditorController",
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        contact: function(){
                            return contact;
                        },
                        openDropdownEditor: function(){
                            return $scope.openDropdownEditor;
                        }
                    }
                });
            }
        };
        
        
        $scope.removeSelectedContact = function(){
            var contact = $scope.contacts[$scope.activeRow];
            if (contact){
                $http.get("http://localhost:1337/contact/destroy/"+contact.id).success(function(data){
                    $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
                })
            }
        };
    });
})()