(function () {
    "use strict";
    var properties = ["title", "firstName", "lastName", "companyName", "adress", "complementoryAdress", "postalCode", "city", "homePhone", "mobilePhone", "officePhone", "email", "birthday", "adherent", "benevole", "donor", "type", "genre", "help", "role", "diverse1", "diverse2", "comments"];
    var blues = angular.module('blues');
    blues.controller("NewContactEditorController", function ($scope, $http, $log, contact, openDropdownEditor) {
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
            if ($scope.type && $scope.type.id) {
                $scope.type = $scope.type.id;
            }
            if ($scope.genre && $scope.genre.id) {
                $scope.genre = $scope.genre.id;
            }
            if ($scope.help && $scope.help.id) {
                $scope.help = $scope.help.id;
            }
            if ($scope.diverse1 && $scope.diverse1.id) {
                $scope.diverse1 = $scope.diverse1.id;
            }
            if ($scope.diverse2 && $scope.diverse2.id) {
                $scope.diverse2 = $scope.diverse2.id;
            }
            $http.get("http://localhost:1337/type/")
                .success(function (data) {
                    $scope.types = data;
                    if (!$scope.type && !$scope.editMode) {
                        $scope.type = data[0];
                    } else if (typeof $scope.type == "number") {
                        var real_type = $scope.types.filter(function (type) {
                            return type.id == $scope.type
                        })[0];
                        if (real_type) {
                            $scope.type = real_type;
                        }
                    }
                });
            $http.get("http://localhost:1337/genre/").success(function (data) {
                $scope.genres = data;
                if (!$scope.genre && !$scope.editMode) {
                    $scope.genre = data[0]
                } else if (typeof $scope.genre == "number") {
                    var real_genre = $scope.genres.filter(function (genre) {
                        return genre.id == $scope.genre
                    })[0];
                    if (real_genre) {
                        $scope.genre = real_genre;
                    }
                }
            });
            $http.get("http://127.0.0.1:1337/help/").success(function (data) {
                $scope.helps = data;
                if (!$scope.help && !$scope.editMode) {
                    $scope.help = data[0]
                } else if (typeof $scope.help == "number") {
                    var real_help = $scope.helps.filter(function (help) {
                        return help.id == $scope.help
                    })[0];
                    if (real_help) {
                        $scope.help = real_help;
                    }
                }
            });
            $http.get("http://localhost:1337/diverse1/").success(function (data) {
                $scope.diverse1s = data;
                if (!$scope.diverse1 && !$scope.editMode) {
                    $scope.diverse1 = data[0]
                } else if (typeof $scope.diverse1 == "number") {
                    var real_diverse1 = $scope.diverse1s.filter(function (diverse1) {
                        return diverse1.id == $scope.diverse1
                    })[0];
                    if (real_diverse1) {
                        $scope.diverse1 = real_diverse1;
                    }
                }
            });
            $http.get("http://localhost:1337/diverse2/").success(function (data) {
                $scope.diverse2s = data;
                if (!$scope.diverse2 && !$scope.editMode) {
                    $scope.diverse2 = data[0]
                } else if (typeof $scope.diverse2 == "number") {
                    var real_diverse2 = $scope.diverse2.filter(function (diverse2) {
                        return diverse2.id == $scope.diverse2
                    })[0];
                    if (real_diverse2) {
                        $scope.diverse2 = real_diverse2;
                    }
                }
            });
        }
        $scope.openDropdownEditor = function () {
            openDropdownEditor.apply(null, arguments).result.then(function () {
                $scope.refresh();
            });
        }
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
        }
        $scope.refresh();
    });
})();