var myModule = angular.module('myModule',[]);
myModule.controller('myCtrl',['$scope',function($scope){
    $scope.ctrlFlavor = '百事可乐';
}]);
myModule.directive('drink',function(){
    return {
        restrict : 'AE',
        scope : {
            flavor2 : '=flavor2'   //与父scope中的属性进行双向绑定
        },
        template : '<input type="text" ng-model="flavor2"/>',
    }
});