(function () {
    "use strict";
    var properties = ["title", "firstName", "lastName", "companyName", "adress", "complementoryAdress", "postalCode", "city", "homePhone", "mobilePhone", "officePhone", "email", "birthday", "adherent", "benevole", "donor", "type", "genre", "help", "role", "diverse1", "diverse2", "comments"];
    var blues = angular.module('blues');
    blues.controller("ExtractionController", function ($scope, $http, $log) {

        $scope.multiSelectTranslations = {
            uncheckAll: "Tout désélectionner",
            buttonDefaultText: "Ignorer ce champ",
            dynamicButtonTextSuffix: "valeur(s) choisie(s)"
        }

        $scope.multiSelectOptions = {
            showCheckAll: false,
            displayProp: "name",
            selectedClasses: "btn btn-success"
        }
        $scope.yesno = [{
            name: "Oui",
            id: 1
        }, {
            name: "Non",
            id: 2
        }];

        $scope.adherent = [];
        $scope.benevole = [];
        $scope.donor = [];
        $scope.type = [];
        $scope.genre = [];
        $scope.help = [];
        $scope.diverse1 = [];
        $scope.diverse2 = [];
        var contact = null;
        var openDropdownEditor = null;


        $scope.cancel = function () {
            $scope.$dismiss();
        }
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
                    method = "create?"
                }
                $http.get("http://localhost:1337/contact/" + method + args).success(function () {
                    $scope.$close();
                });
            }
        };
        $scope.refresh = function () {
            $http.get("http://localhost:1337/type/").success(function (data) {
                $scope.types = data;
            });
            $http.get("http://localhost:1337/genre/").success(function (data) {
                $scope.genres = data;
            });
            $http.get("http://127.0.0.1:1337/help/").success(function (data) {
                $scope.helps = data;
            });
            $http.get("http://localhost:1337/diverse1/").success(function (data) {
                $scope.diverse1s = data;
            });
            $http.get("http://localhost:1337/diverse2/").success(function (data) {
                $scope.diverse2s = data;
            });
        }
        $scope.refresh();
    });
})();