(function () {
    "use strict";

    angular.module('app.home').controller("Home", Home);

    Home.$inject = ['common', '$q', '$scope'];

    function Home(common, $q, $scope) {

        var vm = this;

        vm.init = function () {
            console.log('Initializing Home controler...');
            vm.welcome = "Welcome to our site. This site uses node.js and angular.js. It uses express with gulp for tasks and bundle-up3 to bundle components. It also uses jade for templating.";
        };
        vm.init();
    };


} ());