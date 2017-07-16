var myModule = angular.module('myModule',[]);
myModule.directive('superman',function(){
    return {
        scope : {}, //创建独立作用域
        restrict : 'AE',
        controller : function($scope){//指令内部Controller,给指令暴露出public方法，提供外部调用
            $scope.abilities = [];
            this.addStrength = function(){
                $scope.abilities.push('strength');
            };
            this.addSpeed = function(){
                $scope.abilities.push('speed');
            };
            this.addLight = function(){
                $scope.abilities.push('light');
            }
        },
        link : function(scope,element,attrs){
            element.addClass('btn btn-primary');
            element.bind('mouseenter',function(){
                console.log(scope.abilities);
            })
        }
    }
});
myModule.directive('strength',function(){
    return {
        require : '^superman', //表示strength指令依赖Superman指令
        link : function(scope,element,attrs,supermanCtrl){
            supermanCtrl.addStrength();
        }
    }
});
myModule.directive("speed",function(){
    return {
        require : '^superman',
        link : function(scope,element,attrs,supermanCtrl){
            supermanCtrl.addSpeed();
        }
    }
});
myModule.directive("light",function(){
    return{
        require : '^superman',
        link : function(scope,element,attrs,supermanCtrl){
            supermanCtrl.addLight();
        }
    }
});