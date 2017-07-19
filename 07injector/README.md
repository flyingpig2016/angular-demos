## Angularjs中的依赖注入

### 一：为什么要依赖注入？
&emsp;&emsp;"依赖注入" ——，从字面意思上来说分为两个部分：一是依赖，二是注入。也就是说，当一个对象在建立时候，需要依赖于另一个对象，这是代码层的一种依赖关系；当在代码中声明了依赖关系之后，Angular通过injector注入器将所依赖的对象进行"注入"操作.

### 二：Angular的三种注入方式？
&emsp;&emsp;推断型注入、声明式注入(标注式注入)，内联注入,下面的例子中html只有一个`<div>gameName</div>`
- 内联注入（最常用）
```
    myModule.controller('myCtrl',['$scope',function($scope1){
        function($scope1){
            $scope1.gameName = '棒棒';
        }
    }])
```
- 推断型注入(也就是吧里面的函数拿出来)

&emsp;&emsp;注意：里面的参数($scope)不能随意换，要和被注入的对象相同,因为通常被注入的是作用域$scope
```
    var myCtrl = function($scope){
        $scope.gameName = '棒棒';
    }
    myModule.controller('myCtrl',myCtrl);
```
- 声明式注入（也就是可以换了参数的名称）
```
    var myCtrl = function(myName){
        myName.gameName = '棒棒';
    }
    myCtrl.$inject = ['$scope']; //也就是改了一下函数的参数名称
    myModule.controller('myCtrl',myCtrl);
```
### 三：Angular的创建自定义的注入方式(也就是创建能被注入的服务)？
- provider模式是策略模式和工厂模式的综合体
- 核心目的是为了让接口和现实分离
- 所有的provider都可以用来进行注入：provider/factory/service/constant/value
- 以下类型的函数可以接受注入：controller/directive/filter/service/factory
- Angular中的"依赖注入"是通过provider和injector这两个机制联合实现的

下面例子中html里面都是：`<div>{{myName}}</div>`，下面创建服务的方法，从上到下，灵活度依次变差，因为无论是factory、service、constant还是value最终都是调用provider，(请看Angularjs源码第3922行左右的provider函数)只是他们封装了一下我们看不到而已。
##### provider方式？
```
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
            $scope.myName = HelloAngular.getName();
        }
    ])
```
##### factory方式？（最省事）
```
    var myModule = angular.module("myModule", []);
    myModule.factory('game', function() {
        return {
            gameName: '棒棒'
        }
    });
    myModule.controller('myCtrl',['$scope','game',function($scope,game){
        $scope.myName = game.gameName
    }])
```
##### service方式？(里面只是一个构造函数)
```
    var myModule = angular.module('myModule',[]);
    myModule.service('HelloAngular',function(){
        this.name = '棒棒';
        this.getName = function(){
            return this.name;
        }
    });
    myModule.controller('myCtrl',['$scope','HelloAngular',function($scope,HelloAngular){
        $scope.myName = HelloAngular.getName();
    }])
```