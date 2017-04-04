import angular from 'angular';
import UsageDemoComponent from './usage-demo.component';
import Highcharts from 'highcharts';

window.Highcharts = Highcharts;

angular
  .module('demoApp', [
    'angularHighcharts'
  ])
  .component('usageDemo', UsageDemoComponent);
