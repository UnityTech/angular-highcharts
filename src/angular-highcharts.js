import ChartComponent from './chart.component';
import Chart from './chart';

angular
  .module('angularHighcharts', [])
  .component('chart', ChartComponent);

module.exports = Chart;
