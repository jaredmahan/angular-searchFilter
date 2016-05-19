// Karma configuration
// Generated on Thu May 19 2016 14:32:43 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'test-main.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-sanitize.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-route.min.js',
      'node_modules/angular-mocks/angular-mocks.js',

      'public/app/app.module.js',
      'public/app/app.route.js',
      'public/app/core/core.module.js',
      'public/app/core/config.js',
      'public/app/core/common.js',
      'public/app/home/home.module.js',
      'public/app/home/home.js',
      'public/app/services/services.module.js',
      'public/app/services/employeeService.js',
      'public/app/widgets/widgets.module.js',
      'public/app/widgets/datetimepicker.js',
      'public/app/widgets/rawHtml.js',
      { pattern: 'spec/**/*.js' }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
