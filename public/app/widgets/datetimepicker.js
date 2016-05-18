(function () {
  var dateTimePicker = function ($rootScope) {
    return {
      require: 'ngModel',
      restrict: 'AE',
      scope: false,
      template: '<div class="input-group">' +
            '<input type="text" class="form-control" />' +
            '<span class="input-group-btn"><button class="btn btn-default" type="button"><i class="fa fa-calendar"></i></button></span>' +
            '</div>',
      link: function ($scope, $element, $attrs, ngModel) {
        var input = $element.find('input[type="text"]')
        var button = $element.find('button')
        if (input.datetimepicker === undefined) Error('The datetimepicker directive relies on the Bootstrap 3 Datetimepicker plugin. Download it from https://eonasdan.github.io/bootstrap-datetimepicker/')

        input.datetimepicker({ format: 'MM/DD/YYYY' })

        ngModel.$render = function () {
          var newValue = ngModel.$viewValue
          if (newValue === undefined || newValue === '') {
            input.data('DateTimePicker').clear()
          } else {
            var newDate = moment.utc(newValue).format('MM/DD/YYYY')
            input.data('DateTimePicker').date(newDate)
          }
        }
        button.on('click', function () { input.data('DateTimePicker').show() })
        input.on('blur', function () {
          $scope.$apply(function () {
            // Return datetime without time zone info
            ngModel.$setViewValue(input.data('DateTimePicker').date())
          })
        })
      }
    }
  }

  angular.module('app.widgets').directive('dateTimePicker', dateTimePicker)
})()
