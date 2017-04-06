import Chart from './chart';

describe('Chart', () => {
  beforeEach(angular.mock.module('angularHighcharts'));

  describe('creating new instance', () => {
    it('initializes options when none passed', () => {
      const chart = new Chart();
      expect(chart.options).toEqual({});
    });

    it('initializes with given options', () => {
      const options = { foo: true };
      const chart = new Chart(options);
      expect(chart.options).toEqual(options);
    });
  });

  describe('calling addSeries()', () => {
    let chart;
    let oneSeries;

    beforeEach(() => {
      chart = new Chart();
      oneSeries = {
        data: [],
      };
    });

    it('adds a new data series when no series are present', () => {
      chart.addSeries('foo', oneSeries);
      const addedSeries = { id: 'foo', data: oneSeries.data };
      expect(chart.options.series).toEqual([addedSeries]);
    });

    it('does not mutate passed series', () => {
      const original = angular.copy(oneSeries);
      chart.addSeries('foo', oneSeries);
      expect(oneSeries).toEqual(original);
    });

    it('adds a new data series to an existing series array', () => {
      chart.addSeries('foo', oneSeries);
      chart.addSeries('bar', oneSeries);
      const firstAddedSeries = { id: 'foo', data: oneSeries.data };
      const secondAddedSeries = { id: 'bar', data: oneSeries.data };
      expect(chart.options.series).toEqual([
        firstAddedSeries,
        secondAddedSeries
      ]);
    });

    it('throws when adding a series with duplicate id', () => {
      chart.addSeries('foo', oneSeries);
      expect(() => chart.addSeries('foo', oneSeries)).toThrow();
    });
  });

  describe('calling removeSeries()', () => {
    let chart;

    beforeEach(() => {
      chart = new Chart({
        series: [{
          id: 'foo',
          data: [],
        }]
      });
    });

    it('removes specified existing series', () => {
      chart.removeSeries('foo');
      expect(chart.options.series).toEqual([]);
    });

    it('throws when trying to remove non-existent series', () => {
      expect(() => chart.removeSeries('bar')).toThrow();
    });
  });
});
