import Chart from '../dist/angular-highcharts';

class UsageDemo {
  constructor() {
    this.loading = false;
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [{
        id: 'foo',
        name: 'Line 1',
        data: [1, 5, 3]
      }]
    });
  }

  addSeries() {
    this.chart.addSeries('bar', {
      data: [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    });
  }

  removeSeries() {
    this.chart.removeSeries('bar');
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
}

export default {
  controller: UsageDemo,
  template: `
    <button ng-click="$ctrl.addSeries();">
      ADD NEW SERIES
    </button>
    <button ng-click="$ctrl.removeSeries();">
      REMOVE BAR SERIES
    </button>
    <button ng-click="$ctrl.toggleLoading();">
      TOGGLE LOADING
    </button>
    <chart
      loading="$ctrl.loading"
      chart="$ctrl.chart">
    </chart>
  `
}
