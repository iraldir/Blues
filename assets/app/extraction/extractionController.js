(function () {
    "use strict";
    var properties = ["title", "firstName", "lastName", "companyName", "adress", "complementoryAdress", "postalCode", "city", "homePhone", "mobilePhone", "officePhone", "email", "birthday", "adherent", "benevole", "donor", "type", "genre", "help", "role", "diverse1", "diverse2", "comments"];
    var filterableProperties = ["adherent", "benevole", "donor", "type", "genre", "help", "diverse1", "diverse2"];

    var blues = angular.module('blues');
    blues.controller("ExtractionController", function ($scope, $http, $window, dropdownService) {

        $scope.multiSelectTranslations = {
            uncheckAll: "Tout désélectionner",
            buttonDefaultText: "Ignorer ce champ",
            dynamicButtonTextSuffix: "valeur(s) choisie(s)"
        };

        $scope.multiSelectOptions = {
            showCheckAll: false,
            displayProp: "name",
            selectedClasses: "btn btn-info"
        };
        $scope.columnTranslations = {
            checkAll: "Tout sélectionner",
            uncheckAll: "Tout désélectionner",
            buttonDefaultText: "Tout exporter",
            dynamicButtonTextSuffix: "colonnes affichées"
        };
        $scope.columnOptions = {
            displayProp: "name",
            selectedClasses: "btn btn-info",
            buttonClasses: "btn btn-default",
            scrollable: true,
            scrollableHeight: '200px'
        };
        $scope.columns = properties.map(function (property) {
            return {
                name: property,
                id: property
            };
        });
        $scope.column = [];
        $scope.yesno = [{
            name: "Oui",
            id: 1,
            isBool: true,
            boolValue: true
        }, {
            name: "Non",
            id: 2,
            isBool: true,
            boolValue: false
        }];

        $scope.adherent = [];
        $scope.benevole = [];
        $scope.donor = [];
        $scope.type = [];
        $scope.genre = [];
        $scope.help = [];
        $scope.diverse1 = [];
        $scope.diverse2 = [];

        $scope.cancel = function () {
            $scope.$dismiss();
        };
        $scope.exportExcel = function () {
            var args = "";
            filterableProperties.forEach(function (property) {
                if ($scope[property].length) {
                    $scope[property].forEach(function (propertyValue) {
                        args += property;
                        args += "=";
                        if (propertyValue.isBool) {
                            args += propertyValue.boolValue;
                        } else {
                            args += propertyValue.id;
                        }
                        args += "&";
                    });
                }
            });
            $scope.column.forEach(function (column) {
                args += "col";
                args += "=";
                args += column.id;
                args += "&";
            });
            var method;
            if (args) {
                args = args.substring(0, args.length - 1);
                method = "export/excel?" + args;
            } else {
                method = "export/excel";
            }
            $window.open("/" + method, "_blank", "");
            $scope.$close();
        };
        $scope.exportMail = function () {};
        $scope.exportTags = function () {};
        $scope.exportPrint = function () {};
        $scope.refresh = function () {
            dropdownService.getCategories($scope);
        };
        $scope.refresh();
    });
})();