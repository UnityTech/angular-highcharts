export default class {

  constructor(options = {}) {
    this.options = angular.copy(options);
  }

  _findSeries(id) {
    return this.options.series.find(series => series.id === id);
  }

  _findSeriesIndex(id) {
    return this.options.series.findIndex(series => series.id === id);
  }

  _removeSeries(index) {
    this.options.series.splice(index, 1);
  }

  // Ensure series exist
  _initSeries() {
    if (!this.options.series) {
      this.options.series = [];
    }
  }

  addSeries(...series) {
    this._initSeries();

    series.forEach(({ id, data = []}) => {
      if (this._findSeries(id)) {
        throw new Error(`Series with ID '${id}' already exists.`);
      }
      this.options.series.push({ id, data });
    });
  }

  removeSeries(id) {
    const index = this._findSeriesIndex(id);
    const seriesExists = index > -1;

    if (!seriesExists) {
      throw new Error(`Series with ID '${id}' not found.`);
    }

    this._removeSeries(index);
  }

}
