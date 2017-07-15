# angular-demos
<b>This is a angular-demos, It can show my progress of study.</b>
## 02directive——Angularjs的创建指令方法
### restrict 值分类:
- E 作为元素名使用,例如：`<hello></hello>`  
- A 作为属性使用(默认),例如：`<div hello></div>`
- C 作为类名使用 , 例如：`<div class="hello"></div>`
- M 作为注释使用,  例如：`<!--directive:hello-->`
### directive的templateUrl属性
通常我们这样写，template，但是如果模板里面东西很多，我们就需要独立出来一个html文件，
```
    myApp.directive('hello',function(){
        return{
            restrict : 'AEMC', //- A 作为属性使用(默认),例如：`<div hello></div>`
            template : '<div>Hello everyone, I am bangbang!</div>',
            replace : true
        }
    })
```
用templateUrl属性独立出html文件,**注意：**如果用longDirective命名，引用的时候用`<long-directive></long-directive>`,要不然就用纯小写字母

```
    myApp.directive('longDirective',function(){
        return {
            restrict : 'AEMC',  //- E 作为元素名使用,例如：`<hello></hello>`  
            templateUrl : 'tpls/long.html',
            replace : true
        }
    })
```
### $templateCache(缓存模板方法)
&emsp;&emsp;通过angular创建的模块,都有一个run方法,注射器在加载完成所有模块的时候，该方法使用一次。接受一个函数作为参数.该函数会被执行.$templateCache是angular内置的一个服务,它的put方法用于存放模板.它接受两个参数,第一个参数为模板的名字,第一个参数为模板的名字,也就是templateUrl的值,cache.html,第二个参数就是html字符串,也就是模板的内容.
&emsp;&emsp;这种方法常用于模板内容是通过$http异步获取的.然后将模板放入$templateCache中以便后面使用.

```
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
```
