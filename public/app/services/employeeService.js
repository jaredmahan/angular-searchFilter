(function () {
    "use strict";

    angular.module('app.services').factory('employeeService', employeeService);

    employeeService.$inject = ['common', '$resource']

    function employeeService(common, $resource) {
        return {
            resource: $resource('http://services.odata.org/V4/Northwind/Northwind.svc/Employees(:id)')
        }
    }
} ());