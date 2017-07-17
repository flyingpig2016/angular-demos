var myModule = angular.module('myModule',[]);
myModule.controller('myCtrl',['$scope',function($scope){
    $scope.sayHello = function(name){
        console.log("hello" + name);
    }
}]);
myModule.directive('greeting',function(){
    return {
        restrict : 'AE',
        scope : {
            greet : '&'
        },
        template : '<input type="text" ng-model="userName" />  '+
                    '<button class="btn btn-default" ng-click="greet({name:userName})" >Greet</button></br><br/>',
        link : function(scope,element,attrs){
            element.on('input',function(){
                console.log(attrs.greet)
            })
        }
     }
});