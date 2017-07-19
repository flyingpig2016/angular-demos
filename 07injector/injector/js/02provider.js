var myModule = angular.module('myModule',[]);
myModule.provider('HelloAngular',function(){
    return {
        $get : function(){
            var name = '棒棒';
            function getName(){
                return name;
            }
            return {
                getName : getName
            }
        }
    }
});
myModule.controller('myCtrl',['$scope','HelloAngular',
    function($scope,HelloAngular){
        console.log(HelloAngular)
        $scope.myName = HelloAngular.getName();
    }
])