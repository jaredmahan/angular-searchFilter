(function () {
  'use strict'

  angular.module('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/home/home.html',
        activeTab: 'homeTab'
      })
      .otherwise({
        redirectTo: '/home'
      })
  }])

  angular.module('app').run(['$rootScope', 'common', 'config', function ($rootScope, common, config) {
    $rootScope.isDebug = common.isDebug
    $rootScope.version = config.version
    $rootScope.appTitle = config.appTitle
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next.$$route !== undefined) {
        var activeTab = next.$$route.activeTab
        $('.appTabs').find('li').removeClass('active')
        $('.' + activeTab).addClass('active')
      }
    })
  }])
}())
