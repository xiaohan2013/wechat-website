'use strict';

angular.module('weixinLotteryWebsiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl1'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'contactCtrl'
      })
      .state('help', {
        url: '/help',
        templateUrl: 'app/help/help.html',
        controller: 'helpCtrl'
      })
      .state('myinfo', {
        url: '/myinfo',
        templateUrl: 'app/myinfo/myinfo.html',
        controller: 'myinfoCtrl'
      })
      .state('myinfo.basicinfo', {
        url: '/basicinfo',
        templateUrl: 'components/infocenter/basicinfo/basicinfo.html',
        controller: 'myinfoCtrl'
      })
      .state('myinfo.basicinfo.info', {
        url: '/info',
        templateUrl:'components/infocenter/info/info.html',
        controller: 'myinfoCtrl'
      })
      .state('myinfo.basicinfo.infomodify', {
        url: '/infomodify',
        templateUrl:'components/infocenter/info/infomodify.html',
        controller: 'myinfoCtrl'
      })


      .state('myinfo.mypublicno', {
        url: '/mypublicno',
        templateUrl: 'components/infocenter/mypublicno/mypublicno.html',
        controller: 'myinfoCtrl'
      })


      .state('myinfo.infocenter', {
        url: '/infocenter',
        templateUrl: 'components/infocenter/activitystepdiv.html',
        controller: 'myinfoCtrl'
      })
      .state('myinfo.infocenter.activitystep1', {
        url: '/activitystep1',
        templateUrl: 'components/infocenter/activitystep1/activitystep1.html',
        controller: 'myinfoCtrl'
      })
      .state('myinfo.infocenter.activitystep2', {
        url: '/activitystep2',
        templateUrl: 'components/infocenter/activitystep2/activitystep2.html',
        controller: 'myinfoCtrl'
      })
      .state('myinfo.infocenter.activitystep3', {
        url: '/activitystep3',
        templateUrl: 'components/infocenter/activitystep3/activitystep3.html',
        controller: 'myinfoCtrl'
      });

  });