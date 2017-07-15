var myModule = angular.module('myModule',[]);
myModule.controller('myCtrl',['$scope',function($scope){
    $scope.loadData = function(){
        console.log('loadData 加载数据中11111....');
    } 
}]);
myModule.controller('myCtrl2',['$scope',function($scope){
    $scope.loadData2 = function(){
        console.log('loadData2 加载数据中2222....');
    } 
}]);
myModule.directive('loader',function(){
    return {    
        restrict : 'AE',
        link : function(scope,element,attrs){
            element.bind('mouseenter',function(){
                // scope.loadData();
                // scope.$apply('loadData()')
                scope.$apply(attrs.hotoload); //注意js中需要写成小写，html中可以是大写
            });
        }
    }
})