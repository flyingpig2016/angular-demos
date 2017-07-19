var myModule = angular.module('myModule',[]);

//内联式注入，（最常用）
// myModule.controller('myCtrl',['$scope',function($scope1){
//     function($scope1){
//         $scope1.gameName = '棒棒';
//     }
// }])
//推断型注入：函数参数的名称必须要和被注入的对象相同(也就是$scope)
// var myCtrl = function($scope){
//     $scope.gameName = '棒棒';
// }
// myModule.controller('myCtrl',myCtrl);

//声明式注入
var myCtrl = function(myName){
    myName.gameName = '棒棒';
}
myCtrl.$inject = ['$scope']; //也就是改了一下函数的参数名称
myModule.controller('myCtrl',myCtrl);


