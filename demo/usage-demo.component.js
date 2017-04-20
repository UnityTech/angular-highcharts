import Chart from '../dist/angular-highcharts';

class UsageDemo {
  constructor() {
    this.loading = false;
    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: null,
      },
    });
    // Separate chart initialization from adding series so that
    // upon receiving data, the chart will only rerender without it jumping.
    // This removes the need to create a placeholder with the right size.
    this.chart.addSeries({
      id: 'foo',
      name: 'Line 1',
      data: [1, 5, 3],
    });
  }

  addSeries() {
    const barData = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const bazData = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    this.chart.addSeries({
      id: 'bar',
      name: 'Line 2',
      data: barData
    }, {
      id: 'baz',
      name: 'Line 3',
      data: bazData
    });
  }

  removeSeries() {
    this.chart.removeSeries('bar');
  }

  removeAllSeries() {
    this.chart.removeAllSeries();
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
    <button ng-click="$ctrl.removeAllSeries();">
      REMOVE All SERIES
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
