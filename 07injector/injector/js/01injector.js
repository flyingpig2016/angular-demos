var myModule = angular.module("myModule", []);
myModule.factory('game', function() {
    return {
        gameName: '棒棒'
    }
});

// myModule.controller('myCtrl',['$scope','game',function($scope,game){
//     console.log(game.gameName);
// }])

myModule.controller('myCtrl', ['$scope', '$injector', function($scope, $injector) {
    console.log($injector);
    $injector.invoke(function(game) {
        console.log(game.gameName)
    })
    // console.log($injector.annotate(function(arg0,arg1){}))
}])