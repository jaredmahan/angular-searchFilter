(function () {
  var rawHtml = function () {
    return {
      terminal: true,
      compile: function (element, attrs) {
        var snippetEle = element[0]
        if (attrs.snippetId !== undefined && attrs.snippetId !== null && attrs.snippetId !== '') snippetEle = document.getElementById(attrs.snippetId)

        var rawHtml = snippetEle.innerHTML

        var pre = angular.element('<pre class="language-javascript"></pre>')
        var code = angular.element('<code class="language-javascript"></code>')
        var html = Prism.highlight(rawHtml.trim(), Prism.languages.javascript)
        code.html(html)
        pre.html(code)
        element.replaceWith(pre)
      }
    }
  }

  angular.module('app.widgets').directive('rawHtml', rawHtml)
})()
