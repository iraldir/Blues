(function(){
    "use strict";
    var blues = angular.module('blues');
    blues.controller("NewContactEditorController", function($scope, $http, $log){
        $scope.title = "Monsieur";
        $scope.firstName = "johan";
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
        $scope.type = "";
        $scope.genre = "";
        $scope.adherent = false;
        $scope.benevole = false;
        $scope.donor = false;
        $scope.help = "";
        $scope.diverse1 = "";
        $scope.diverse2 = "";
        $scope.function = "";
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
        $scope.cancel = function(){
            $scope.$dismiss();
        }
        $scope.save = function(){
            $scope.$close();
        }
    });
})();