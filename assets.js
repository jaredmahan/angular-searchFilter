module.exports = function(assets){
    registerScripts(assets);
    registerCss(assets);
}

function registerScripts(assets){
     assets.addJsUrl('/js/jquery.js', 'jquery');
       
    assets.addJsUrl('/js/angular.js', 'angular');
    
    assets.addJsUrl('/js/angular-resource.js', 'angularThirdParty');
    assets.addJsUrl('/js/angular-route.js', 'angularThirdParty');
    assets.addJsUrl('/js/angular-sanitize.js', 'angularThirdParty');
    
    assets.addJsUrl('/js/bootstrap.js', 'bootstrap');
    assets.addJsUrl('/js/moment.js', 'bootstrap');
    assets.addJsUrl('/js/bootstrap-datetimepicker.js', 'bootstrap');
      
    assets.addJsUrl('/js/site.js', 'defaultJs');
    
    // Angular Bundling
    
    // app
    assets.addJsUrl('/app/app.module.js', 'app');
    assets.addJsUrl('/app/app.route.js', 'app');
    
    // core
    assets.addJsUrl('/app/core/core.module.js', 'core');
    assets.addJsUrl('/app/core/config.js', 'core');
    assets.addJsUrl('/app/core/common.js', 'core');
    
    // home
    assets.addJsUrl('/app/home/home.module.js', 'home');
    assets.addJsUrl('/app/home/home.js', 'home');
    
    // services
    assets.addJsUrl('/app/services/services.module.js', 'services');
    assets.addJsUrl('/app/services/employeeService.js', 'services');
    
    // widgets
    assets.addJsUrl('/app/widgets/widgets.module.js', 'widgets');
    assets.addJsUrl('/app/widgets/datetimepicker.js', 'widgets');
    
    assets.addJsUrl('/app/widgets/filter/filter.module.js', 'widgets');
    assets.addJsUrl('/app/widgets/filter/filterService.js', 'widgets');
    assets.addJsUrl('/app/widgets/filter/filter.js', 'widgets');
}

function registerCss(assets){
    assets.addCssUrl('/css/bootstrap.css', 'defaultCss');
    assets.addCssUrl('/css/bootstrap-datetimepicker.css', 'defaultCss');
    assets.addCssUrl('/css/font-awesome.css', 'defaultCss');
    assets.addCssUrl('/css/site.css', 'defaultCss');
    assets.addCssUrl('/css/angularSearchFilter.css', 'defaultCss');
}

