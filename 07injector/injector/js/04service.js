var myModule = angular.module('myModule',[]);
myModule.service('HelloAngular',function(){
    this.name = '棒棒';
    this.getName = function(){
        return this.name;
    }
});
myModule.controller('myCtrl',['$scope','HelloAngular',
    function($scope,HelloAngular){
        $scope.myName = HelloAngular.getName();
    }
])