(function(){
    "use strict";
    var properties = ["title" ,"firstName" ,"lastName" ,"companyName" ,"adress" ,"complementoryAdress" ,"postalCode" ,"city" ,"homePhone" ,"mobilePhone" ,"officePhone" ,"email" ,"birthday" ,"adherent" ,"benevole" ,"donor" ,"type" ,"genre" ,"help" ,"role" ,"diverse1" ,"diverse2" ,"comments"];
    var blues = angular.module('blues');
    blues.controller("NewContactEditorController", function($scope, $http, $log, contact, openDropdownEditor){
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
        
        $http.get("http://localhost:1337/type/")
		 .success(function(data){
		 	$scope.types=data;
            if (!$scope.type) $scope.type = data[0];
		 });
        $http.get("http://localhost:1337/genre/").success(function(data){
            $scope.genres=data;
            if (!$scope.genre) $scope.genre=data[0]
        });
        $http.get("http://127.0.0.1:1337/help/").success(function(data){
            $scope.helps=data;
            if (!$scope.help) $scope.help=data[0]
        });
        $http.get("http://localhost:1337/diverse1/").success(function(data){
            $scope.diverse1s=data;
            if (!$scope.diverse1) $scope.diverse1=data[0]
        });
        $http.get("http://localhost:1337/diverse2/").success(function(data){
            $scope.diverse2s=data;
            if (!$scope.diverse2) $scope.diverse2=data[0]
        });
        $http.get("http://localhost:1337/role/").success(function(data){
            $scope.roles=data;
            if (!$scope.role) $scope.role=data[0]
        });
        $scope.openDropdownEditor = openDropdownEditor;
        if (contact){
            $scope.editMode = true;
            $scope.id = contact.id;
            properties.forEach(function(property){
                if (contact[property]){
                    $scope[property] = contact[property];
                }
            });
        }
        $scope.cancel = function(){
            $scope.$dismiss();
        }
        $scope.save = function(){
            var args = "";
            properties.forEach(function(property){
                if ($scope[property]){
                    args+= property;
                    args+= "=";
                    if($scope[property].id){
                        args += $scope[property].id;
                    } else {
                        args += $scope[property];
                    } 
                    args+= "&";
                }
            });
            
            if (args){
                args = args.substring(0,args.length - 1);
                var method = "";
                if ($scope.editMode){
                    method = "update/"+$scope.id+"?";
                } else {
                    method = "create?"
                }
                $http.get("http://localhost:1337/contact/"+method+args).success(function(){
                });
            }
            $scope.$close();
            
        }
    });
})();