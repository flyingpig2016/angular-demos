---
title: AngularJs中ui.router使用方法
toc: true
comments: true
date: 2017-07-14 18:39:30
tags: Angularjs
categories:
---
### 一：为什么使用ui-router？
&emsp;&emsp;如果使用原生router的话，也就是当我们在index.html页面引用`angular-route.js`的时候，例如：我们在index.html页面的`body`下加入`<div class="page {{pageClass}}" ng-view></div>`，然后我们在`app.js`中写入（具体代码看文章末尾的下载链接）：
```
var bookStoreApp = angular.module('bookStoreApp', [
    'ngRoute', 'ngAnimate', 'bookStoreCtrls', 'bookStoreFilters',
    'bookStoreServices', 'bookStoreDirectives'
]);

bookStoreApp.config(function($routeProvider) {
    $routeProvider.when('/hello', {
        templateUrl: 'tpls/hello.html',
        controller: 'HelloCtrl'
    }).when('/list', {
        templateUrl: 'tpls/bookList.html',
        controller: 'BookListCtrl'
    }).otherwise({
        redirectTo: '/hello'
    })
});
```
此时，我们首页默认显示hello，当我们在页面中点击下一页链接的时候，我们跳转到以list为模板的页面。以上是简单的页面跳转，但是如果我们需要稍微复杂一点的页面，例如我们想要写个上面一个是菜单栏，菜单栏下面还有点击的页面，就像是选项卡一样，但是分别进入了不同的页面（实际上是angularjs路由机制中替换了某个模板），如下图所示：
![](http://img.blog.csdn.net/20170714171942351?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZmx5aW5ncGlnMjAxNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
我们就需要用到嵌套的路由，因此，我们需要用到angularjs中ui.router模块。
<!--more-->
### 二：怎样使用ui-router？
&emsp;&emsp;使用`ui-router`和`ngRouter`模块当然有很多不同的地方，例如在index.html中，我们在body中就使用`<div ui-view=""></div>`。接下来看详细用法：
1.首先我们需要知道项目的目录结构：
![目录结构](http://img.blog.csdn.net/20170714172416091?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZmx5aW5ncGlnMjAxNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
其中node_modules和package.json不用多说，是git版本控制，不用也可以，app目录就是项目的入口，里面的index.html是主模板，js中的app.js是项目的入口文件，tpls目录里面存放html模板，它需要和index.html组合使用。当然，组合使用就需要路由文件的支持。
2.我们需要使用bower安装`angular-ui-router`模块，当然是在你的项目任意目录下面创建，使用的时候需要写好路径就好，尽量到framework里面安装，因为里面都是存放angularjs相关的js代码和文件
```
bower install angular-ui-router
```
3.其次就是添加index.html文件
```
<!doctype html>
<html ng-app="routerApp">

<head>
    <meta charset="UTF-8">
    <title>BookStore</title>
    <link rel="stylesheet" href="framework/bootstrap-3.0.0/css/bootstrap.css">
    <script src="../bower_components/angular/angular.min.js"></script>
    <script src="../bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>  
    <script src="js/app.js"></script>
</head>

<body>
    <nav class="navbar navbar-inverse" role="navigation">  
        <div class="navbar-header">  
            <a class="navbar-brand" ui-sref="#">AngularUI Router</a>  
        </div>  
        <ul class="nav navbar-nav">     
            <li>  
                <a ui-sref="home">Home</a>  
            </li>  
            <li>  
                <a ui-sref="about">About</a>  
            </li>  
        </ul>  
    </nav>  
    <div class="container">  
        <div ui-view=""></div>  
    </div> 
</body>
</html>
```
接下来创建四个模板文件：about.html,home.html.home-list.html和table-data.html，代码如下：
home.html页面：
```
<div class="jumbotron text-center">  
    <h1>Home</h1>  
    <p>This page demonstrates  
        <span class="text-danger">nested</span>views.  
    </p>  
    <a ui-sref=".list" class="btn btn-primary">List</a>  
    <a ui-sref=".paragraph" class="btn btn-danger">Paragraph</a>  
</div>  
<div ui-view></div>  
```
home下面有两个链接list和paragraph，这连个模板如下所示：
home-list.html页面：
```
<ul>  
    <li ng-repeat="topic in topics">{{ topic }}</li>  
</ul>  
```
paragraph页面在app.js里面被直接写入：
```
		.state('home.paragraph', {
			url: '/paragraph',
			template: 'I could sure use a scoop of ice-cream.2 '
		})
```
因此，可以不用创建，如果需要更复杂的页面，就需要创建，在这里只是作为演示。

4.然后我们添加about.html页面
about.html页面
```
<div class="jumbotron text-center">  
    <h1>The About Page</h1>  
    <p>This page demonstrates  
        <span class="text-danger">multiple</span>and  
        <span class="text-danger">named</span>views.</p>  
</div>  
<div class="row">  
    <div class="col-md-6">  
        <div ui-view="columnOne"></div>  
    </div>  
    <div class="col-md-6">  
        <div ui-view="columnTwo"></div>  
    </div>  
</div>  
```
about页面里面有两个ui-view,即：columnOne和columnTwo，所以需要另一个模板table-data.html显示，该模板如下：
```
<h2>Ice-Creams</h2>  
<table class="table table-hover table-striped table-bordered">  
    <thead>  
        <tr>  
            <td>Name</td>  
            <td>Cost</td>  
        </tr>  
    </thead>  
    <tbody>  
        <tr ng-repeat="topic in topics">  
            <td>{{ topic.name }}</td>  
            <td>${{ topic.price }}</td>  
        </tr>  
    </tbody>  
</table>  
```
5.配置页面的路由，即app.js文件
```
var routerApp = angular.module('routerApp', ['ui.router']);  
routerApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	/*路由重定向 $urlRouterProvider:如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 home.html,  
	 *这个页面就是状态名称被声明的地方. */
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'tpls/home.html'
		})
		/*  nested list with custom controller*/
		.state('home.list', {
			url: '/list',
			templateUrl: 'tpls/home-list.html',
			controller: function($scope) {
				$scope.topics = ['Butterscotch', 'Black Current', 'Mango'];
			}
		})
		// nested list with just some random string data  
		.state('home.paragraph', {
			url: '/paragraph',
			template: 'I could sure use a scoop of ice-cream.2 '
		})
		.state('about', {
			url: '/about',
			/* view 用在该状态下有多个 ui-view 的情况，可以对不同的 ui-view 使用特定的 template, controller, resolve data 
			 绝对 view 使用 '@' 符号来区别，比如 'columnOne@about' 表明名为 'columnOne' 的 ui-view 使用了 'about' 状态的 
			 模板(template)，相对 view 则无*/
			views: {
				// 无名 view  
				'': {
					templateUrl: 'tpls/about.html'
				},
				// for "ui-view='columnOne'"  
				'columnOne@about': {
					template: '这里是第一列的内容'
				},
				// for "ui-view='columnTwo'"  
				'columnTwo@about': {
					templateUrl: 'tpls/table-data.html',
					controller: 'table-Controller'
				}
			}
		});
}]);
routerApp.controller('table-Controller', function($scope) {
	$scope.message = 'test';
	$scope.topics = [{
		name: 'Butterscotch',
		price: 50
	}, {
		name: 'Black Current',
		price: 100
	}, {
		name: 'Mango',
		price: 20
	}];
});
```
最后写一下需要学习更多的童鞋，github网址：[angular-ui/ui-router的github链接地址](https://github.com/angular-ui/ui-router)
我的代码备份：[angularjs中ui.router和ngRouter模块的用法](http://download.csdn.net/detail/flyingpig2016/9899101)