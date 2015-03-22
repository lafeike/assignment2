// Application module that injects routing, controller, and directive dependencies.
var myApp = angular.module('myApp', ['ngRoute', 'myControllers', 'myDirectives'])
            .config(function ($routeProvider) {
                         $routeProvider.when("/home", {
                             // templateUrl: 'views/list.html',
                             // controller: 'ListCtrl'
                         }
                    )
             // If no route is selected then use the 'home' route.
             .otherwise({ redirectTo: '/home' });
    });

// Directive - Modifies HTML behaviour.
var myDirectives = (function () {
    var myDirectives = angular.module('myDirectives', []);

    // directive() is a factory method to create directives.
    myDirectives.directive('myInputs', function () {
        return {
            restrict: 'E',
            link: function ($scope, elem, attr, ctrl) {
                $scope.inputSubmit = function () {
                    $scope.pathToTheViewOnServer = "views/stars.html";
                };
            },
            templateUrl: function (element, attr) { return 'views/inputs.html' }
        }
    });
    return myDirectives;
}());

// Controller - dispatches inputs and outputs.
var myControllers = (function () {
    var myControllers = angular.module('myControllers', []);

    // Controllers are defined by the controller function.
    myControllers.controller('AppCtrl', ['$scope', 'simpleService',
        function ($scope, simpleService) {
            $scope.title = "AngularJS Tutorial";
            $scope.pathToTheViewOnServer = simpleService.v1;

    }]);

    myControllers.controller('testJsonCtrl', ['$scope','simpleService',
        function ($scope, simpleService) {
            $scope.error = false;
            var promise = simpleService.getData($scope);

            promise.then(
                function (numbers) {
                    $scope.numbers = numbers;
                },
                function (errorReason) {
                    $scope.error = true;
                    $scope.msg = "An error occurred while fetching data.";
                    console.log(errorReason);
                });
        }]);
    return myControllers;
}());

myApp.factory("simpleService", ["$http", "$q", function ($http, $q) {
    var service = {};
    service.getData = function ($scope) {
            var deferred = $q.defer(); // Set up deferral.
            $http.get("http://ssdprogram.ca/testJson2.php ")
                .success(function (data) {
                    deferred.resolve(data);                // Return resource.
                })
                .error(function () {
                    deferred.reject("*** Rejected! ****");  // Return rejection.
                });;
            return deferred.promise; // Promise to return something once available.
    };
    return service;
}]);
