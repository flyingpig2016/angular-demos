## Angular中指令与控制器之间的交互，（link属性使用）
### 认识link属性？
&emsp;&emsp;link属性值为一个函数,link函数主要用于操作dom元素,给dom元素绑定事件和监听,这个函数有五个参数:scope,element,attrs,ctrl,linker
- scope: 指令所在的作用域,这个scope和指令定义的scope是一致的.至于指令的scope,会在讲解scope属性的时候详细解释
- element: 指令元素的jqLite封装.(也就是说iEle可以调用angular封装的简版jq的方法和属性.)
- attrs: 指令元素的属性的集合
- ctrl : 需要和require属性一起使用,用于调用其他指令的方法,指令之间的互相通信,这个在讲require属性的时候会详细解释
- linker:也就是transclude()函数,可以用于得到指令中需要被嵌入的html内容
下面举个例子：
当我们在01link.html加入：
```
    <div ng-controller="myCtrl">
        <loader">滑动加载</loader>
    </div>
```
创建01link.js:
```
    var myModule = angular.module('myModule',[]);
    myModule.controller('myCtrl',['$scope',function($scope){
        $scope.loadData = function(){
            console.log('loadData 加载数据中11111....');
        } 
    }]);
    myModule.directive('loader',function(){
        return {    
            restrict : 'AE',
            link : function(scope,element,attrs){
                element.bind('mouseenter',function(){
                    scope.loadData();
                    scope.$apply('loadData()');//和上面一样
                });
            }
        }
    })
```
这时候，鼠标移动到标签上，控制台输出loadData 加载数据中11111....；
但是`scope.loadData()`和`scope.$apply('loadData')`总是有区别的，当我们的html多加一个loader标签，就需要加入属性来区别：
```
        <div ng-controller="myCtrl">
            <loader hoToLoad="loadData()">滑动加载</loader>
        </div>
        <div ng-controller="myCtrl2">
            <loader hotoload="loadData2()">滑动加载</loader>
        </div> 
    ```
    想要两个滑动加载标签都响应，就需改变js代码：
    ```
    var myModule = angular.module('myModule',[]);
    myModule.controller('myCtrl',['$scope',function($scope){
        $scope.loadData = function(){
            console.log('loadData 加载数据中11111....');
        } 
    }]);
    myModule.controller('myCtrl2',['$scope',function($scope){
        $scope.loadData2 = function(){
            console.log('loadData2 加载数据中2222....');
        } 
    }]);
    myModule.directive('loader',function(){
        return {    
            restrict : 'AE',
            link : function(scope,element,attrs){
                element.bind('mouseenter',function(){
                    // scope.loadData();
                    // scope.$apply('loadData()')
                    scope.$apply(attrs.hotoload); //注意js中需要写成小写，html中可以是大写
                });
            }
        }
    })
```
