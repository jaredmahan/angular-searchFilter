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
      
    assets.addJsUrl('/js/site.js', 'default');
    
    assets.addJsUrl('/app/app.module.js', 'app');
    assets.addJsUrl('/app/app.route.js', 'app');
    
    assets.addJsUrl('/app/core/core.module.js', 'core');
    assets.addJsUrl('/app/core/config.js', 'core');
    assets.addJsUrl('/app/core/common.js', 'core');
    
    assets.addJsUrl('/app/home/home.module.js', 'home');
    assets.addJsUrl('/app/home/home.js', 'home');
}

function registerCss(assets){
    assets.addCssUrl('/css/bootstrap.css', 'bootstrap');
    assets.addCssUrl('/css/site.css', 'site');
}

