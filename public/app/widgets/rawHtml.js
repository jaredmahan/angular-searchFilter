(function () {
    
var rawHtml = function() {
    return {
        compile: function(element, attrs) {
            var rawHtml = element[0].innerHTML;
            var pre =  angular.element('<pre class="language-javascript"></pre>');
            var code = angular.element('<code class="language-javascript"></code>');
            var html = Prism.highlight(rawHtml.trim(), Prism.languages.javascript)
            code.html(html);
            pre.html(code);
            element.replaceWith(pre);
        },
    }
};

 angular.module('app.widgets').directive('rawHtml', rawHtml);
})();