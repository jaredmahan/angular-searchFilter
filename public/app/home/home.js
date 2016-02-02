(function () {
    "use strict";

    angular.module('app.home').controller("Home", Home);

    Home.$inject = ['employeeService', 'common', '$q', '$scope'];

    function Home(employeeService, common, $q, $scope) {

        var vm = this;

        vm.init = function () {
            vm.loading = true;
            var initialPromises = [];
            initialPromises.push(employeeService.resource.get().$promise);
            $q.all(initialPromises).then(function (response) {
                vm.loading = false;
                vm.employees = response[0].value;
            });
            vm.welcome = "Welcome to our site. This site uses node.js and angular.js. "
              + "It uses express with jade as the template engine. "
              + "Finally, we top it off by using gulp for tasks such as building javascript, "
              + "less, and css and bundle everything together using bundle-up3."
        };
        vm.init();
    };


} ());