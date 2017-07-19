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
    $scope.$watch('username',function(newValue,oldValue, scope){
        console.log(newValue);  //新值
        console.log(oldValue);  //旧值
        if(newValue){
            if(timeout){
                $timeout.cancel(timeout);
            }
        }
        timeout = $timeout(function(){
            console.log(userListService.userList())
            userListService.userList(newValue).success(function(data,status){
                $scope.users = data;
            })
        },350);
    })
}])