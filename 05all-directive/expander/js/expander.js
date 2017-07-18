var myModule = angular.module('myModule',[]);
myModule.controller('SomeController',function($scope){
    $scope.expanders = [{
        title : 'Click me to expand',
        text : '三国演义',
    },{
        title : 'click this',
        text : 'I am event better text than you have seen previously',
    },{
        title : 'Test',
        text : 'test'
    }];
});
myModule.directive('accordion',function(){
    return{
        restrict : 'EA',
        replace : true,
        transclude : true,
        template : '<div ng-transclude></div>',
        controller : function(){
            var expanders = [];
            this.gotOpened = function(selectedExpander){
                angular.forEach(expanders,function(expander){
                    if(selectedExpander != expander){ //当不上点击的那个div的话，就把它的showMe设置为false
                        expander.showMe = false;  
                    }
                    console.log(expanders)
                });
            }
            this.addExpander = function(expander){
                expanders.push(expander);
                
            }
            
        }
        
    }
});
myModule.directive('expander',function(){
    return {
        restrict : 'EA',
        replace :true,
        transclude : true,
        require :'^?accordion',
        scope : { 
            title : '=expanderTitle'
        },
        template : '<div>'+
                    '<div class="title" ng-click="toggle()">{{title}}</div>' +
                    '<div class="body" ng-show="showMe" ng-transclude></div>'
                    +'</div>',
        link : function(scope,element,attrs,accordionController){
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle(){
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
})