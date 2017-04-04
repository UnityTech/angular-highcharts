class ChartComponent {
  constructor($element) {
    'ngInject';
    this._$element = $element[0];
    this._instance = null;
    this._prevOptions = null;
  }

  $onInit() {
    this.init();
  }

  $onDestroy() {
    this.destroy();
  }

  $doCheck() {
    if (!angular.equals(this._prevOptions, this.chart.options)) {
      this.destroy();
      this.init();
      this._prevOptions = angular.copy(this.chart.options);
    }
  }

  $onChanges({ loading }) {
    this.init();

    if (loading) {
      this.setLoading();
    }
  }

  init() {
    if (this._instance) {
      return;
    }
    this._instance = Highcharts.chart(this._$element, this.chart.options);
  }

  destroy() {
    if (this._instance) {
      this._instance.destroy();
      this._instance = null;
    }
  }

  setLoading() {
    if (this.loading) {
      this._instance.showLoading();
    } else {
      this._instance.hideLoading();
    }
  }
}

export default {
  controller: ChartComponent,
  bindings: {
    chart: '<',
    loading: '<'
  }
}
