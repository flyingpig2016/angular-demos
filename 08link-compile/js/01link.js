var myModule = angular.module('myModule', []); 
myModule.directive('hello', function() {
    return {
        restrict:'EA', 
        template:'<div>Hi everyone !</div>', 
        replace:'true', 
        link : function(scope, element, attrs, controller) {
            element.on('mouseover', function() {
                // console.log('鼠标进入'); 
            })
        }
    }
}).directive('altofhello',function(){
    return {
        restrict : 'A',
        compile : function(element,attrs,transclude){
            console.log('指令编译。。。。');
            var tpl = element.children().clone();
            console.log(tpl);
            for(var i=0; i<attrs.altofhello-1; i++){
                element.append(tpl.clone());
            }
            return function(scope,element,attrs,controller){ //其实输出一个link函数,compile规定(不输出也不报错)
                console.log('指令链接....');
            }
        },
        link : function(){     //注意：这个link函数是没有用的，所以他们俩不同时使用
            console.log('我自己的link函数');
        }
    }
})