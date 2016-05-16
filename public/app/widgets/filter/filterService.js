(function () {
    "use strict"

    angular.module("app.widgets.filter").factory('filterService', filterService);

    function filterService() {
        var service = {
            uid: {
                new: function () {
                    function _p8(s) {
                        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
                    }
                    return _p8() + _p8(true) + _p8(true) + _p8();
                },
                empty: function () {
                    return '00000000-0000-0000-0000-000000000000';
                }
            },
            arraysEqual: function (arr1, arr2) {
                if (arr1.length !== arr2.length)
                    return false;
                for (var i = arr1.length; i--;) {
                    if (arr1[i] !== arr2[i])
                        return false;
                }

                return true;
            },
            generateODataPattern: function (selected) {
                // Add odata pattern if it exists
                var odataPattern = service.odataPatternLookup(selected.operator);

                if (odataPattern !== null && odataPattern !== undefined) {
                    switch (selected.type) {
                        case 'string':
                            odataPattern = odataPattern.replace('{1}', '\'{1}\'');
                            selected.odataPattern = odataPattern.format(selected.property, selected.value);
                            break;
                        case 'date':
                        case 'datetime':
                            var date = selected.value;
                            selected.odataPattern = odataPattern.format(selected.property, date.format("YYYY-MM-DDTHH:mm:ss.SS[Z]"));
                            selected.value = date.format("MM/DD/YYYY");
                            break;
                        default:
                            selected.odataPattern = odataPattern.format(selected.property, selected.value);
                            break;
                    }
                }
                return selected;
            },
            odataPatternLookup: function (operator) {
                var dict = {}
                dict['equal'] = '{0} eq {1}';
                dict['equals'] = '{0} eq {1}';
                dict['not equal'] = '{0} ne {1}';
                dict['not equals'] = '{0} ne {1}';
                dict['greater than'] = '{0} gt {1}';
                dict['greater than or equal'] = '{0} ge {1}';
                dict['less than'] = '{0} lt {1}';
                dict['less than or equal'] = '{0} le {1}';
                dict['contains'] = 'contains({0}, {1})';
                dict['ends with'] = 'endswith({0}, {1})';
                dict['starts with'] = 'startswith({0}, {1})';
                dict['before'] = '{0} lt {1}';
                dict['after'] = '{0} gt {1}';

                return dict[operator];

            }
        }

        return service;
    };
} ());