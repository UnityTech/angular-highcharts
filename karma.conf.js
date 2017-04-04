module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: [
      'jasmine',
      'browserify'
    ],

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './dist/angular-highcharts.js',
      './src/chart.spec.js'
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-babel-preprocessor',
      'karma-spec-reporter',
      'karma-browserify',
      'karma-jasmine'
    ],

    exclude: [],

    preprocessors: {
      './src/*.js': [
        'browserify'
      ]
    },

    browserify: {
      transform: [
        'babelify'
      ]
    },

    reporters: [
      'spec'
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
}
