(function () {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appTitle: 'Angular Search Filter',
        version: 'alpha-0-0.0.0.9',
    };
    core.value('config', config);
    
}());