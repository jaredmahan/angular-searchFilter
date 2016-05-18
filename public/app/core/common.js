(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('common', common)

  function common () {
    var root = $('#rootPath').val() !== '/' ? $('#rootPath').val() : ''
    var service = {
      rootPath: root,
      webApiPath: root,
      isDebug: $('#isDebug').val() === 'true',
      // Regex Patterns used with ng-pattern need no escaping
      regex: {
        realNumber: '^[1-9][0-9]*$'
      }
    }

    return service
  }
}())
