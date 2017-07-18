var myModule = angular.module('myModule',[]);
myModule.filter('filter1',function(){
    return  function(item){
        return item + '༺王者༻'
    }
})