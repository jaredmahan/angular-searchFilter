(function () {
  'use strict'

  angular.module('app.home').controller('Home', Home)

  Home.$inject = ['employeeService', 'common', '$q', '$scope']

  function Home (employeeService, common, $q, $scope) {
    var vm = this

    vm.init = function () {
      vm.loading = true
      var initialPromises = []

      initialPromises.push(employeeService.resource.get().$promise)
      $q.all(initialPromises).then(function (response) {
        vm.loading = false
        vm.employees = response[0].value
      })
    }
    vm.filterTable = function (filters) {
      vm.pagingLoading = true

      if (filters !== undefined) {
        if (filters.odataQuery !== undefined) {
          vm.filterString = filters.odataQuery
          // tableState.pagination.start = 0
        }
      }

      var searchOptions = { $count: true }
      // searchOptions.$top = tableState.pagination.number || 15
      // searchOptions.$skip = tableState.pagination.start || 0
      // if (tableState.sort.predicate !== undefined) {
      // searchOptions.$orderby = tableState.sort.predicate + (tableState.sort.reverse ? ' desc' : ' asc')
      // }

      searchOptions.$filter = vm.filterString

      var promises = []
      promises.push(employeeService.resource.query(searchOptions).$promise)
      $q.all(promises).then(function (response) {
        // vm.translations = response[0].value
        vm.employees = response[0].value

        // tableState.pagination.totalItemCount = response[0]['@odata.count']
        // tableState.pagination.numberOfPages = Math.ceil(response[0]['@odata.count'] / parseInt(tableState.pagination.number))
        // vm.pagination = tableState.pagination

        // add end index
        // vm.tableState = tableState
        // vm.tableState.pagination.end = vm.tableState.pagination.start + vm.tableState.pagination.number
        // if (vm.tableState.pagination.number > vm.tableState.pagination.totalItemCount
        //    || (vm.tableState.pagination.start + vm.tableState.pagination.number + 1) > vm.tableState.pagination.totalItemCount) {
        //    vm.tableState.pagination.end = vm.tableState.pagination.totalItemCount
        // }

        vm.isLoading = false
        vm.pagingLoading = false
      })
    }
    vm.init()
  }
}())
