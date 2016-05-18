(function () {
  'use strict'

  angular.module('app', [
    // App Modules
    'app.core',
    'ngSanitize',
    'ngRoute',
    'ngResource',
    // Feature Areas
    'app.home',
    'app.services',
    'app.widgets'
  ])
}())
