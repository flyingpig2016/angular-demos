## scope的绑定策略

### 初探scope的用法？
&emsp;&emsp;我们创建一个例子：
html文件中：
```
    <hello></hello>
    <hello></hello>
    <hello></hello>
    <hello></hello>
```
js代码：
```
    var myModule = angular.module('myModule',[]);
    myModule.directive('hello',function(){
        return {
            scope : {},
            restrict : 'AE',
            template : '<div><input type="text" ng-model="userName" />{{userName}}</div>',
            replace : true
        }
    })
```
以上代码，当不存在`scope:{}`的时候，在其中一个input输入，其他都发生变化，当存在的时候，输入一个，其他不发生变化。
### scope的绑定策略？
- @ ：把当前属性作为字符串传递，你还可以绑定来自外层scope的值，在属性值中插入{{}}即可，此方法是单项绑定；
- = ：与父scope中的属性进行双向绑定
- & ：传递来自父scope的函数，稍后调用

#### @例子如下：
02scope@html内容：
```
    <div ng-controller="myCtrl">
        <drink flavor="{{ctrlFlavor}}"></drink>
    </div>
```
js内容：
```
    var myModule = angular.module('myModule',[]);
    myModule.controller('myCtrl',['$scope',function($scope){
        $scope.ctrlFlavor = '百事可乐';
        $scope.ctrlFlavor2 = '可口可乐';
    }]);
    myModule.directive('drink',function(){
        return {
            restrict : 'AE',
            scope : {
                flavor: '@flavor'  //传递的是字符串,把当前属性作为字符串传递,效果和下面的link属性的效果一样。
            },
            template : '<div>{{flavor}}</div>',
              // link : function(scope,element,attrs){
            //     console.log(attrs)
            //     scope.flavor = attrs.flavor;
            // },  
            controller : function($scope){
                console.log($scope.flavor); //百事可乐
            }
        }
    });
```
#### =例子如下：
需要注意的是,=和@的区别是：html中`<drink flavor2="ctrlFlavor"></drink>`中的`flavor2="ctrlFlavor"`必须为双引号，不能为{{ctrlFlavor}},而且 = 可以传递父scope的对象，而 @ 只能为数据
03.scope=.html内容：
```
    <div ng-controller="myCtrl">
        Ctrl : <br>
        <input type="text" ng-model="ctrlFlavor"> <br>
        Directive : <br>
        <drink flavor2="ctrlFlavor"></drink>
    </div>
```
03.scope=.js内容：
```
    var myModule = angular.module('myModule',[]);
    myModule.controller('myCtrl',['$scope',function($scope){
        $scope.ctrlFlavor = '百事可乐';
    }]);
    myModule.directive('drink',function(){
        return {
            restrict : 'AE',
            scope : {
                flavor2 : '='   //与父scope中的属性进行双向绑定
            },
            template : '<input type="text" ng-model="flavor2"/>',
        }
    });
```
#### &例子如下：
04scope&.html内容：
```
    <div ng-controller="myCtrl">
        <greeting greet="sayHello(name)"></greeting>
        <greeting greet="sayHello(name)"></greeting>
        <greeting greet="sayHello(name)"></greeting>
    </div>
```
04scope&.js内容：
我们知道，template中的表达式使我们自定义的内部作用域即 `'<input type="text" ng-model="userName" />  '+'<button class="btn btn-default" ng-click="greet({name:userName})"`,而`<greeting greet="sayHello(name)"></greeting>`就是自定义指令的外部作用域，两者之间的桥梁就是scope所定义的关系：`greet : '&'`,相当于把 外部作用域的sayHello函数通过greet赋值给了ng-click中的函数。
```
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
```
