(function(){
	"use strict";
	var blues = angular.module("blues");
	blues.controller('ContactController', function ($scope, $modal, $http) {
        
        $scope.contactsLength = 0;

        $scope.fetchContacts = function () {
            $scope.contacts = [];
            $http.get("http://localhost:1337/contact/length").success(function (data) {
                $scope.contactsLength = Number(data);
            });
            if ($scope.filter){
                $http.get("http://localhost:1337/contact/smartfind/"+$scope.filter).success(function (data) {
                    $scope.contacts = data;
                });
            } else {
                $http.get("http://localhost:1337/contact/").success(function (data) {
                    $scope.contacts = data;
                });
            }
        };

        $scope.openDropdownEditor = function (label, name) {
            return $modal.open({
                templateUrl: "app/dropdown/dropdownEditor.html",
                controller: "DropdownEditorController",
                backdrop: 'static',
                resolve: {
                    label: function () {
                        return label;
                    },
                    name: function () {
                        return name;
                    }
                }
            });
        };
        $scope.openNewContactEditor = function () {
            $modal.open({
                templateUrl: "app/contact/newContactEditor.html",
                controller: "NewContactEditorController",
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    contact: function () {
                        return undefined;
                    },
                    openDropdownEditor: function () {
                        return $scope.openDropdownEditor;
                    }
                }
            }).result.then(function () {
                $scope.fetchContacts();
            });
        };
        $scope.openEditContactEditor = function () {
            var contact = $scope.contacts[$scope.activeRow];
            if (contact) {
                $modal.open({
                    templateUrl: "templates/newContactEditor.html",
                    controller: "NewContactEditorController",
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        contact: function () {
                            return contact;
                        },
                        openDropdownEditor: function () {
                            return $scope.openDropdownEditor;
                        }
                    }
                }).result.then(function () {
                    $scope.fetchContacts();
                });
            }
        };
        $scope.openExtraction = function(){
            $modal.open({
                templateUrl: "app/extraction/extraction.html",
                controller: "ExtractionController",
                size: 'lg'
            });
        };

        $scope.removeSelectedContact = function () {
            var contact = $scope.contacts[$scope.activeRow];
            if (contact) {
                $http.get("http://localhost:1337/contact/destroy/" + contact.id).success(function () {
                    $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
                });
            }
        };



        $scope.generateFakeContacts = function () {
            for (var i = 0; i < $scope.contactToGenerate; i++) {
                var firstName = chance.first();
                var lastName = chance.last();
                var title = chance.pick(["Monsieur", "Madame"]);
                var companyName = chance.word();
                var adress = chance.address();
                var postalCode = chance.areacode();
                var city = chance.city();
                var email = chance.email({
                    domain: "gmail.com"
                });
                var homePhone = null,
                    mobilePhone = null,
                    officePhone = null;
                if (Math.random() > 0.3) {
                    homePhone = chance.phone({
                        country: "fr"
                    });
                }
                if (Math.random() > 0.3) {
                    mobilePhone = chance.phone({
                        country: "fr",
                        mobile: true
                    });
                }
                if (Math.random() > 0.3) {
                    officePhone = chance.phone({
                        country: "fr"
                    });
                }
                var birthday = null;
                if (Math.random() > 0.3) {
                    var b = chance.birthday();
                    birthday = b.getDate() + "/" + b.getMonth() + "/" + b.getFullYear();
                }
                var adherent = chance.bool();
                var benevole = chance.bool();
                var donor = chance.bool();
                var type = chance.integer({
                    min: 0,
                    max: 4
                });
                var genre = chance.integer({
                    min: 0,
                    max: 4
                });
                var role = chance.word();
                var help = chance.integer({
                    min: 0,
                    max: 4
                });
                var diverse1 = chance.integer({
                    min: 0,
                    max: 4
                });
                var diverse2 = chance.integer({
                    min: 0,
                    max: 4
                });
                var comments = null;
                if (Math.random() > 0.5) {
                    comments = chance.sentence();
                }

                var options = {
                    title: title,
                    firstName: firstName,
                    lastName: lastName,
                    companyName: companyName,
                    adress: adress,
                    postalCode: postalCode,
                    city: city,
                    homePhone: homePhone,
                    mobilePhone: mobilePhone,
                    officePhone: officePhone,
                    birthday: birthday,
                    email: email,
                    adherent: adherent,
                    benevole: benevole,
                    donor: donor,
                    type: type,
                    genre: genre,
                    role: role,
                    help: help,
                    diverse1: diverse1,
                    diverse2: diverse2,
                    comments: comments
                };
                var args = "";
                var firstProperty = true;
                for (var property in options) {
                    if (options[property]) {
                        if (!firstProperty) {
                            args += "&";
                        }
                        firstProperty = false;
                        args += property;
                        args += "=";
                        args += options[property];
                    }
                }
                var method = "create?";
                if (args) {
                    callMethod(method, args);
                }
            }
        };
		
		function callMethod(method, args){
			$http.get("http://localhost:1337/contact/" + method + args).success(function () {
                        $http.get("http://localhost:1337/contact/").success(function (data) {
                            $scope.contacts = data;
                        });
                    });
		}
        $scope.fetchContacts();
    });
})();
