var myModule = angular.module("myModule", []);
myModule.factory('game', function() {
    return {
        gameName: '棒棒'
    }
});
myModule.controller('myCtrl',['$scope','game',function($scope,game){
    $scope.myName = game.gameName;
}])