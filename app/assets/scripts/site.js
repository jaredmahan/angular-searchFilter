var myModule = angular.module("MyModule",['ODataResources']);
myModule.controller("MyController",function($scope,$odataresource){
	$scope.name = "Jared's App";
    $scope.results = 
        $odataresource("http://localhost:63967/odata/Translations")
        .odata().get(1);
        //.filter('UnitPrice','>',10)
        //.filter('Discontinued',true)
        //.orderBy('UnitsInStock','asc')
        //.expand('Category')
        //.query();
});