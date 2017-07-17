var myModule = angular.module('myModule',[]);
myModule.controller('myCtrl',['$scope',function($scope){
    $scope.ctrlFlavor = '百事可乐';
    $scope.ctrlFlavor2 = '可口可乐';
}]);
myModule.directive('drink',function(){
    return {
        restrict : 'AE',
        scope : {
            flavor: '@flavor'  //传递的是字符串,把当前属性作为字符串传递
        },
        template : '<div>{{flavor}}</div>',
        // link : function(scope,element,attrs){
        //     console.log(attrs)
        //     scope.flavor = attrs.flavor;
        // },
        controller : function($scope){
            console.log($scope.flavor); //百事可乐
        }
    }
});
myModule.directive('drink2',function(){
    return {
        restrict : 'AE',
        scope : {
            flavor2 : '='   //与父scope中的属性进行双向绑定
        },
        template : '<input type="text" ng-model="flavor2"/>'
    }
});