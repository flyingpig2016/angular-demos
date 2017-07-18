### angularjs子定义Service用法？
#### $http的用法？
&emsp;&emsp;`$http`是Angularjs内置的服务，用起来可以链式调用，用法如下：
```
    myMdoule.controller('LoadDataCtrl',['$scope','$http',function($scope,$http){
        $http({
            method : 'get',
            url : 'js/data.json'
        }).success(function(data,status,headers,config){
            console.log('success.....');
            console.log(data);
            $scope.users = data;
        }).error(function(data,status,headers,config){
                console.log('error');
        })
    }])
```
#### 自定义service用法？
- Service都是单例的
- Service由$injector负责实例化
- Service在整个应用的声明周期中存在，可以用来共享数据
- 在需要使用的地方利用依赖注入机制注入Service
- 自定义的Service需要写在内置Service后面
- 内置Service的命名以$符号开头，自定义Service应该避免
我们创建02providerhtml：
```
    <div ng-controller="ServiceController">
        <label for="">用户名</label>
        <input type="text" ng-model="username" placeholder="请输入用户名">
        <pre ng-show="username">{{users}}</pre>
    </div>
```
引用的js代码如下,其中$timeout是Angular内置的服务，类似的服务还有$http,$interval,下面的userListService是我们自定义的服务，调用方法为：
```
    userListService.userList(newUserName).success(function(data,status){
        $scope.users = data;
    })
```
所有的代码：
```
var myServiceApp = angular.module('myServiceApp',[]);
myServiceApp.factory('userListService',['$http',function($http){
    var doRequest = function(username,path){
        return $http({
            method : 'get',
            url : 'js/data.json'
        });
    }
    return {
        userList : function(username){
            return doRequest(username,'userList');
        }
    }
}]);
myServiceApp.controller('ServiceController',['$scope','$timeout','userListService',function($scope,$timeout,userListService){
    var timeout;
    $scope.$watch('username',function(newUserName){
        if(newUserName){
            if(timeout){
                $timeout.cancel(timeout);
            }
        }
        timeout = $timeout(function(){
            userListService.userList(newUserName).success(function(data,status){
                $scope.users = data;
            })
        },350);
    })
}])
```
#### filter和自定义的filter？

html内容如下：
```
        {{1304375948024 | date}} <br>
        {{1304385948024 | date:"MM/dd/yyyy @ h:mma"}}   <br>
        {{1304375648024 | date:"yyyy-MM-dd hh:mm:ss"}}   <br>
        自定义filter：{{'大漠孤烟直' | filter1}}
```
03.filter.js自定义如下：
```
    var myModule = angular.module('myModule',[]);
    myModule.filter('filter1',function(){
        return  function(item){
            return item + '༺王者༻'
        }
    })
```
Service总结：
- $compile：编译服务
- $filter：数据格式化工具内置了8个
- $interval
- $timeout
- $local
- $location
- $location
- $log
- $parse
- $http ：封装了ajax
