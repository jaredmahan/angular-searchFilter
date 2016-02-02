(function () {
    "use strict"

    angular.module("app.widgets.filter").directive('angularSearchFilter', angularSearchFilter)
    angular.module("app.widgets.filter").directive('predefinedFilter', predefinedFilter);

    //angularSearchFilter.$inject = ['common'];
    
    var controller = function ($scope, $element, $attrs, $transclude) {
        var vm = this;
        vm.init = function () {
            console.log('angularSearchFilter: Controller initialized.');
            vm.predefinedFilters = [];
            console.log('test');

        }
        vm.init();
    }

    function angularSearchFilter() {
        return {
            //require: 'ngModel',
            restrict: 'E',
            templateUrl: 'app/widgets/filter/filter.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                datasource: '='
            },
            //scope: false,
            // link: function($scope, $element, $attrs, ngModel){
            //     console.log('angularSearchFilter: link initialized.');
            // }
        }
    };

    function predefinedFilter() {
        return {
            require: '^angularSearchFilter',
            restrict: 'E',
            template: '',
            scope: {
                name: '@',
                value: '@'
            },
            //scope: false,
            link: function ($scope, $element, $attrs, parentCtrl) {
                parentCtrl.predefinedFilters.push($scope);
                console.log('angularSearchFilter: predefined filter intialized.');
            }
        }
    }
    
    // Child directive
    // Predefined search node
    // 
} ());