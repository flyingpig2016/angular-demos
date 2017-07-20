## compile函数与link函数用法

###compile和link函数用法？
- compile函数的作用是对指令的模板进行转换；
- link作用是在模型和视图之间建立关联，包括在元素上注册事件监听；
- scope在link阶段才会被绑定到元素上，因此compile阶段操scope会报错
- 对于同一个指令的多个实例，compile只会执行一次，而link对于指令的每个实例都会执行一次；
- 一般情况下我们只要编写link函数就够了(请看第二个例子)
- 请注意，如果你编写的自定义的compile函数的同时自定义的link函数无效，因为compile函数应该返回一个link函数供后续处理（请看第一个例子）

例子一，html内容：
```
        <hello></hello>
        <div altofhello="5">
            <p> 棒棒你好! </p>
        </div>
```
js里面：
```
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
```

实例二:
html内容：
```
    <div ng-repeat="i in [1,2]">
        <div repeater="2">
            <p>你好，棒棒！</p>
        </div>
    </div>
```
js内容：
```
var myModule = angular.module('myModule',[]);
myModule.directive('repeater',function(){
    return {
        restrict : 'AE',
        compile : function(element,attrs,transclude){
            console.log('repeat ..... compile.....');      //控制台只输出1次
            //var tpl = element.children().clone();
            //for(var i=0; i<attrs.repeater-1; i++){
            //    element.append(tpl.clone());
            //}
            //返回link函数
            return function(scope,element,attrs,controller){
                console.log('repeat.......link.......');   //控制台执行2次
            }
        }
        
    }
})
```
github源码：[compile函数与link函数用法](https://github.com/flyingpig2016/angular-demos/tree/master/08link-compile)