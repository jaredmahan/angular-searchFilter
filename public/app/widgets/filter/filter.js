(function () {
    "use strict"

    angular.module("app.widgets.filter").directive('angularSearchFilter', angularSearchFilter)
    angular.module("app.widgets.filter").directive('predefinedFilter', predefinedFilter);
    angular.module("app.widgets.filter").directive('propertyFilter', propertyFilter);

    var controller = function ($scope, $element, $attrs, $transclude, filterService) {
        var vm = this;
        vm.operators = {
            date: ['before', 'after', 'equals'],
            string: ['equals', 'contains', 'starts with', 'ends with']
        };
        vm.init = function () {
            vm.initUserInterface();
            console.log('angularSearchFilter: Controller initialized.');
            vm.predefinedOptions = [];
            vm.propertyOptions = [];
            vm.predefinedFilters = [];
            vm.propertyFilters = [];
            vm.filters = [];
            vm.selectedPredefined = null;
            vm.selectedProperty = null;
            vm.selectedOperator = null;
        };
        vm.initUserInterface = function () {
            if (vm.enablePredefinedFiltering !== "false") {
                vm.enablePredefinedFiltering = true;
                vm.showPredefinedFiltering();
            } else vm.showPropertyFiltering();
            if (vm.enablePropertyFiltering !== "false") vm.enablePropertyFiltering = true;
            if (vm.enablePredefinedFiltering === "false" && vm.enablePropertyFiltering === "false") {
                throw "Angular Search Filter: You must enable either predefined or propery search."
            }
        };
        vm.getOperators = function () {
            if (vm.selectedProperty === null) return;
            var result = vm.operators[vm.selectedProperty.type];
            return result;
        }
        vm.showPredefinedFiltering = function () {
            vm.propertyVisible = false;
            vm.predefinedVisible = true;
        };
        vm.showPropertyFiltering = function () {
            vm.predefinedVisible = false;
            vm.propertyVisible = true;
        };
        vm.addPredefinedFilter = function () {
            var selected = angular.copy(vm.selectedPredefined);
            selected.uid = filterService.uid.new();
            vm.predefinedFilters.push(selected);
        };
        vm.addPropertyFilter = function () {
            var selected = angular.copy(vm.selectedProperty);
            var exists = false;
            // Validate the property filter doesn't already exist
            angular.forEach(vm.propertyFilters, function (item, idx) {
                var sameProperty = selected.property === item.property;
                var sameOperator = selected.operator === item.operator;
                var sameValue = selected.value === item.value;
                if (sameProperty && sameOperator && sameValue) {
                    alert('Selected filter already exists');
                    exists = true;
                    return;
                }
            });
            if (!exists) {
                selected.uid = filterService.uid.new();
                vm.propertyFilters.push(selected);
            }
        };
        vm.removePredefinedFilter = function (filter) {
            var index = -1;
            angular.forEach(vm.predefinedFilters, function (item, idx) { if (item.uid == filter.uid) index = idx; });
            vm.predefinedFilters.splice(index, 1);
        };
        vm.removePropertyFilter = function (filter) {
            var index = -1;
            angular.forEach(vm.propertyFilters, function (item, idx) { if (item.uid == filter.uid) index = idx; });
            vm.propertyFilters.splice(index, 1);
        };
        vm.clearAll = function () {
            vm.predefinedFilters = [];
            vm.propertyFilters = [];
        };
        vm.init();
    };

    function angularSearchFilter() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/widgets/filter/filter.html',
            controller: ['$scope', '$element', '$attrs', '$transclude', 'filterService', controller],
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                datasource: '=',
                enablePropertyFiltering: '@',
                enablePredefinedFiltering: '@'
            }
        }
    };
    function predefinedFilter() {
        return {
            require: '^angularSearchFilter',
            restrict: 'E',
            scope: {
                name: '@',
                value: '@'
            },
            link: function ($scope, $element, $attrs, parentCtrl) {
                parentCtrl.predefinedOptions.push({ name: $scope.name, value: $scope.value });
                console.log('angularSearchFilter: predefined option intialized.');
            }
        }
    };
    function propertyFilter() {
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
                parentCtrl.propertyOptions.push({ name: $scope.name, property: $scope.property, type: $scope.type, exclude: $scope.exclude });
                console.log('angularSearchFilter: property option intialized.');
            }
        }
    };
} ());