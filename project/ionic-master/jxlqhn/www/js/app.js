angular.module('lqApp', ['ionic', 'lqApp.controllers', 'lqApp.services','lqApp.directives'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

        //ʹ��$ionicConfigProvider������ionic��Ŀ���ɵĵ��������ֻ�����������
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        // ʹ��$stateProvider�е�state()����������·�ɵ����ã�����ionic�ֵ�·��ʵ�ֻ���
        // �˴���û��ʹ��AngularJS�е�·�ɻ���

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract:true,
                templateUrl: 'templates/tabs.html'
            })

            //��¼
            .state('login',{
                url:'/login',
                templateUrl:'templates/login.html',
                controller:'LoginCtrl'
            })

            //ע��
            .state('register',{
                url:'/register',
                templateUrl:'templates/register.html',
                controller:'RegisterCtrl'
            })

            //�޸�����
            .state('modifyPassword',{
                url:'/modifyPassword',
                templateUrl:'templates/modifyPassword.html',
                controller:'ModifyPasswordCtrl'
            })

            //��ҳģ��
            .state('tab.main',{
                url:'/main',
                views:{
                    'tab-main':{
                        templateUrl:'templates/tab-main.html',
                        controller:'MainCtrl'
                    }
                }

            })

            //��ҳ-����ģ��
            .state('tab.main-detail',{
                url:'/main/:id',
                views:{
                    'tab-main':{
                        templateUrl:'templates/main-detail.html',
                        controller:'MainDetailCtrl'
                    }
                }

            })





            //��Ϣ��ѯģ��
            .state('tab.xxcx',{
                url:'/xxcx',
                views:{
                    'tab-xxcx':{
                        templateUrl:'templates/tab-xxcx.html',
                        controller:'XxcxCtrl'
                    }
                }

            })

            //��Ϣ��ѯ-����ģ��
            .state('tab.xxcx-detail',{
                url:'/xxcx/:id',
                views:{
                    'tab-xxcx':{
                        templateUrl:'templates/xxcx-detail.html',
                        controller:'XxcxDetailCtrl'
                    }
                }

            })

            //����ƽ̨ģ��
            .state('tab.gqpt',{
                url:'/gqpt',
                views:{
                    'tab-gqpt':{
                        templateUrl:'templates/tab-gqpt.html',
                        controller:'GqptCtrl'
                    }
                }

            })
            //����ƽ̨-����ģ��
            .state('tab.gqpt-detail',{
                url:'/gqpt/:id',
                views:{
                    'tab-gqpt':{
                        templateUrl:'templates/gqpt-detail.html',
                        controller:'GqptDetailCtrl'
                    }
                }

            })

            //�ʲ�����ģ��
            .state('tab.zcgs',{
                url:'/zcgs',
                views:{
                    'tab-zcgs':{
                        templateUrl:'templates/tab-zcgs.html',
                        controller:'ZcgsCtrl'
                    }
                }

            })

            //�ʲ�����-���飨������ģ��
            .state('tab.zcgs-detail',{
                url:'/zcgs/:id',
                views:{
                    'tab-zcgs':{
                        templateUrl:'templates/zcgs-detail.html',
                        controller:'ZcgsDetailCtrl'
                    }
                }

            })

            //��ģ��
            .state('tab.personal',{
                url:'/personal',
                views:{
                    'tab-personal':{
                        templateUrl:'templates/tab-personal.html',
                        controller:'PersonalCtrl'
                    }
                }

            })
    });
