// Module
var weatherApp = angular.module("weatherApp", ["ngRoute", "ngResource"]);

// Routes
weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.htm",
            controller: "homeController"
        })
        .when("/forecast", {
            templateUrl: "pages/forecast.htm",
            controller: "forecastController"
        })
        .when("/forecast/:days", {
            templateUrl: "pages/forecast.htm",
            controller: "forecastController"
        });
});

// Custom Service
weatherApp.service("cityService", function () {
    this.city = "Rochester, NY";
});

// Controllers
weatherApp.controller("homeController", [
    "$scope",
    "cityService",
    function ($scope, cityService) {
        $scope.city = cityService.city;

        $scope.$watch("city", function () {
            cityService.city = $scope.city;
        });
    }
]);

weatherApp.controller("forecastController", [
    "$scope",
    "$resource",
    "$routeParams",
    "cityService",
    function ($scope, $resource, $routeParams, cityService) {
        $scope.city = cityService.city;

        $scope.days = $routeParams.days || 5;

        $scope.weatherAPI = $resource(
            "http://api.weatherapi.com/v1/forecast.json?key=65c096c37d0b483c9a9184556231610",
            { callback: "JSON_CALLBACK" },
            +"&" + { get: { method: "JSONP" } }
        );

        $scope.weatherResult = $scope.weatherAPI.get({
            q: $scope.city,
            days: $scope.days
        });
    }
]);
