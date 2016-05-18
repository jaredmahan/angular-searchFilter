(function () {
  'use strict'

  angular.module('app.widgets.filter').directive('angularSearchFilter', angularSearchFilter)
  angular.module('app.widgets.filter').directive('predefinedFilter', predefinedFilter)
  angular.module('app.widgets.filter').directive('propertyFilter', propertyFilter)

  var controller = function ($scope, $element, $attrs, $transclude, filterService) {
    var vm = this
    vm.enablePredefinedFiltering = (vm.enablePredefinedFiltering === 'true')
    vm.enablePropertyFiltering = vm.enablePropertyFiltering === undefined ? true : (vm.enablePredefinedFiltering === 'true')

    vm.operators = {
      date: ['before', 'after'],
      datetime: ['before', 'after'],
      string: ['equals', 'contains', 'starts with', 'ends with'],
      int32: ['equals', 'greater than', 'greater than or equal', 'less than', 'less than or equal'],
      number: ['equals', 'greater than', 'greater than or equal', 'less than', 'less than or equal'],
      bool: ['equals', 'not equals'],
      boolean: ['equals', 'not equals']
    }
    vm.init = function () {
      // if predefined filtering is not enabled only show property filtering
      vm.enablePredefinedFiltering ? vm.showPredefinedFiltering() : vm.showPropertyFiltering()

      // if the user tries to disable predefined and property filtering throw and error.
      if (!vm.enablePredefinedFiltering && !vm.enablePropertyFiltering) {
        throw Error('Angular Search Filter: You must enable either predefined or propery search.')
      }

      vm.predefinedOptions = []
      vm.propertyOptions = []
      vm.predefinedFilters = []
      vm.propertyFilters = []
      vm.filters = []
      vm.selectedPredefined = null
      vm.selectedProperty = null
      vm.selectedOperator = null

      // Watch the property and predefined filters for changes. If there is a change fire the on change en
      $scope.$watch('[vm.propertyFilters,vm.predefinedFilters]', function (prop, pre) {
        if (filterService.arraysEqual(prop[0], prop[1]) && filterService.arraysEqual(pre[0], pre[1])) return

          // Generate an odata query from the property filters
          // TODO: Append the predefined filters to the property filters
        var filterString = null
        for (var i = 0; i < prop[0].length; i++) {
          if (filterString === null) filterString = ''
          if (i > 0) filterString += ' and '
          filterString += prop[0][i].odataPattern
        }
        // For working with smart table
        // vm.onChange($scope.tableState, { odataQuery: filterString, property: prop[0], predefinedFilter: pre[0] })
        vm.onChange({ odataQuery: filterString, property: prop[0], predefinedFilter: pre[0] })
      }, true)
    }

    vm.getOperators = function () {
      if (vm.selectedProperty === null) return
      var result = vm.operators[vm.selectedProperty.type]
      return result
    }

    vm.showPredefinedFiltering = function () {
      vm.propertyVisible = false
      vm.predefinedVisible = true
    }

    vm.showPropertyFiltering = function () {
      vm.predefinedVisible = false
      vm.propertyVisible = true
    }

    vm.addPredefinedFilter = function () {
      // TODO: Add predefined filtering functionality
      var selected = angular.copy(vm.selectedPredefined)
      selected.uid = filterService.uid.new()
      vm.predefinedFilters.push(selected)
    }

    vm.addPropertyFilter = function () {
      var selected = angular.copy(vm.selectedProperty)
      var exists = false

      // Validate the property filter doesn't already exist
      angular.forEach(vm.propertyFilters, function (item, idx) {
        var sameProperty = selected.property === item.property
        var sameOperator = selected.operator === item.operator
        // Check the value and check for the same dates
        var sameValue = selected.value === item.value || selected.value.format('MM/DD/YYYY') === item.value
        if (sameProperty && sameOperator && sameValue) {
          window.alert('Selected filter already exists')
          exists = true
          return
        }
      })

      if (!exists) {
        selected.uid = filterService.uid.new()
        selected = filterService.generateODataPattern(selected)
        vm.propertyFilters.push(selected)
      }
    }

    vm.removePredefinedFilter = function (filter) {
      var index = -1
      angular.forEach(vm.predefinedFilters, function (item, idx) { if (item.uid === filter.uid) index = idx })
      vm.predefinedFilters.splice(index, 1)
    }

    vm.removePropertyFilter = function (filter) {
      var index = -1
      angular.forEach(vm.propertyFilters, function (item, idx) { if (item.uid === filter.uid) index = idx })
      vm.propertyFilters.splice(index, 1)
    }

    vm.clearAll = function () {
      vm.predefinedFilters = []
      vm.propertyFilters = []
      vm.selectedProperty = null
    }

    vm.init()
  }

  function angularSearchFilter () {
    return {
      // Uncomment to work with smart table
      // require: '^stTable',
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/widgets/filter/filter.html',
      controller: ['$scope', '$element', '$attrs', '$transclude', 'filterService', controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        datasource: '=',
        enablePropertyFiltering: '=?',
        enablePredefinedFiltering: '=?',
        onChange: '='
      },
      link: function ($scope, $element, $attrs, parentCtrl) {
        // Uncomment to work with smart table
        // $scope.tableState = parentCtrl.tableState();
      }
    }
  }
  function predefinedFilter () {
    return {
      require: '^angularSearchFilter',
      restrict: 'E',
      scope: {
        name: '@',
        value: '@'
      },
      link: function ($scope, $element, $attrs, parentCtrl) {
        parentCtrl.predefinedOptions.push({ name: $scope.name, value: $scope.value })
      }
    }
  };
  function propertyFilter () {
    return {
      require: '^angularSearchFilter',
      restrict: 'E',
      scope: {
        name: '@',
        property: '@',
        type: '@',
        exclude: '@'
      },
      link: function ($scope, $element, $attrs, parentCtrl) {
        parentCtrl.propertyOptions.push({ name: $scope.name, property: $scope.property, type: $scope.type.toLowerCase(), exclude: $scope.exclude })
      }
    }
  }
}())

// String manipulation added here
// First, checks if it isn't implemented yet.

if (!String.prototype.format) {
  String.prototype.format = function () { // eslint-disable-line no-extend-native
    var args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined' ? args[number] : match
    })
  }
}
