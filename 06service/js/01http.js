var myMdoule = angular.module('myModule',[]);
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