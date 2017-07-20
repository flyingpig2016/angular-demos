var myModule = angular.module('myModule',[]);
myModule.directive('repeater',function(){
    return {
        restrict : 'AE',
        compile : function(element,attrs,transclude){
            console.log('repeat ..... compile.....');
            var tpl = element.children().clone();
            for(var i=0; i<attrs.repeater-1; i++){
                element.append(tpl.clone());
            }
            //返回link函数
            return function(scope,element,attrs,controller){
                console.log('repeat.......link.......');
            }
        }
        
    }
})