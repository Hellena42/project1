let app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'main/login.html',
        controller: 'loginCtrl'
    })
    .when('/home', {
        resolve: {
            'check': function ($location, $rootScope) {
                if (!$rootScope.loggedIn) {
                    $location.path('/')
                }
            }
        },
        templateUrl: 'inner-pages/home.html'
    })
    .when('/hobbies', {
        templateUrl: 'inner-pages/hobbies.html',
        controller: 'hobbiesCtrl'
    })
    .when('/hobbies/:hobbyId', {
        templateUrl: 'inner-pages/hobby.html',
        controller: 'hobbyCtrl'
    })
    .otherwise({
        template: '404 Page not found'
    })
});

app.directive('mainHeader', function() {
    return {
        templateUrl: 'main/header.html'
    }
});

app.controller('loginCtrl', function($scope, $rootScope, $location, loginService) {
    $scope.loginSubmit = function() {
        if (loginService.login($scope.firstname, $scope.lastname)) {
            $rootScope.firstName = $scope.firstname;
            $rootScope.lastName = $scope.lastname;
            $rootScope.loggedIn = true;
            $scope.firstname = '';
            $scope.lastname = '';
            $location.path('/home');
        } else {
            $scope.error = 'Please enter valid firstname/lastname'
        }
    }
});

app.controller('logoutCtrl', function($scope, $rootScope, $location) {
    $scope.logout = function() {
        $rootScope.firstName = '';
        $rootScope.lastName = '';
        $rootScope.loggedIn = false;
        $location.path('/');
    }
});

app.factory('loginService', function() {
    let firstName = 'Benedict';
    let lastname = 'Cucumber';
    let token = 'asdfgh';
    let isLoggedIn = false;

    return {
        login: function(firstname, lastname) {
            isLoggedIn = firstname == 'Benedict' && lastname == 'Cucumber';
            return isLoggedIn;
        },
    }
});

app.controller('hobbyCtrl', function($scope, $routeParams, $rootScope, hobbyService) {
    $scope.hobbyService = hobbyService.myHobbies;
    $scope.myHobbies = hobbyService.myHobbies;
    $scope.fullHobby = {};
    let hobbyId = Number($routeParams.hobbyId);
    angular.forEach($scope.myHobbies, function(value, key) {
        if (value.id == hobbyId) {
            $scope.fullHobby = value;
        }
    });
});

app.controller('hobbiesCtrl', function ($scope, hobbyService) {
    $scope.myHobbies = hobbyService.myHobbies;
    $scope.myHobbies.sort((a, b) => a.title.localeCompare(b.title));
    $scope.resetHobbies = function() {
        $scope.addedName = '';
        $scope.addedDescription = '';
        $scope.addedAchievement = '';
    };
    
    $scope.addHobby = function() {      
        if (!$scope.addedName || !$scope.addedDescription || !$scope.addedAchievement) {
            $scope.error = 'Please enter valid info'
            return;
        }

        $scope.myHobbies.push({
            id: $scope.myHobbies.length + 1,
            title: $scope.addedName,
            description: $scope.addedDescription,
            achievement: $scope.addedAchievement
        });
        $scope.resetHobbies();
    };
    $scope.removeHobby = function(delData) {
        $scope.myHobbies.splice($scope.myHobbies.indexOf(delData), 1);
    };
});

app.factory('hobbyService', function() {        
    return {
         myHobbies: [{
                id: 1,
                title: 'Чтение',
                description: 'Ведьмаку заплатите',
                achievement: 'Книжный червь'
            }, {
                id: 2,
                title: 'Спать',
                description: 'Сегодня лягу спать пораньше',
                achievement: 'Дергающийся глаз'
            }, {
                id: 3,
                title: 'Прокрастинация',
                description: 'Завтра начну',
                achievement: 'Человек-прокрастинатор'
            }, {
                id: 4,
                title: 'Нудеть',
                description: 'Все не так и все не то',
                achievement: 'Ойвсе'
            }] 
    } 
});