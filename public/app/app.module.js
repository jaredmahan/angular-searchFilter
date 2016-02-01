$(function () {
    "use strict";

    var app = angular.module('app', [
        // App Modules
        'app.core',
        'ngSanitize',
        'ngRoute',
        'ngResource',
        
        // Feature Areas
        'app.home'
        //'app.services',
        //'app.widgets'
        
    ]);

    
}());