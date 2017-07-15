var myApp = angular.module('myApp',[]);
myApp.directive('hello',function(){
    return{
        restrict : 'AEMC', //- A 作为属性使用(默认),例如：`<div hello></div>`
        template : '<div>Hello everyone, I am bangbang!</div>',
        replace : true
    }
})

//templateUrl属性：用longDirective命名，引用的时候用<long-directive></long-directive>,要不然就用纯小写字母
myApp.directive('longDirective',function(){
    return {
        restrict : 'AEMC',  //- E 作为元素名使用,例如：`<hello></hello>`  
        templateUrl : 'tpls/long.html',
        replace : true
    }
})

// templateCache属性使用
//注射器在加载完成所有模块的时候，该方法使用一次。
myApp.run(function($templateCache){
    // $templateCache.put('tpls/cache.html','<div>hello everyone!!!!</div>')
    $templateCache.put('cache.html','<p>我是缓存的模板</p>')
});
myApp.directive('cacheDirective',function($templateCache){
    return{
        restrict : 'AECM',
        template : $templateCache.get('cache.html'),
        replace : true
    }
})

//replace
myApp.directive("noReplace",function(){
    return {
        restrict : 'AECM',
        template : "<div>Hello everyone,I am noReplace!</div><div ng-transclude></div>",
        transclude : true
    }
})

//compile与link
myApp.directive('cpl',function(){
    return {
        restrict : 'AECM',
        template : '<div>Hello bangbang</div>',
        replace : true,
        compile : function(){ //用来对模板自身进行转换

        },
        link : function(){ //用来操作DOM和绑定事件监听器

        }
    }
})
