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
    let seriesOne;
    let seriesTwo;

    beforeEach(() => {
      chart = new Chart();
      seriesOne = { id: 'foo', data: [] };
      seriesTwo = { id: 'bar', data: [] };
    });

    it('adds a new data series when no series are present', () => {
      chart.addSeries(seriesOne);

      expect(chart.options.series).toEqual([seriesOne]);
    });

    it('does not mutate passed series', () => {
      const original = angular.copy(seriesOne);
      chart.addSeries(seriesOne);

      expect(seriesOne).toEqual(original);
    });

    it('adds a new data series to an existing series array on consecutive calls', () => {
      chart.addSeries(seriesOne);
      chart.addSeries(seriesTwo);

      expect(chart.options.series).toEqual([
        seriesOne,
        seriesTwo
      ]);
    });

    it('adds multiple series in one call', () => {
      chart.addSeries(seriesOne, seriesTwo);

      expect(chart.options.series).toEqual([
        seriesOne,
        seriesTwo
      ]);
    });

    it('passes through all object keys of a series', () => {
      const customSeriesObject = {
        id: 'foo', data: [], foo: true, bar: false
      };

      chart.addSeries(customSeriesObject);
      
      expect(chart.options.series).toEqual([
        customSeriesObject,
      ]);
    });

    it('throws when adding a series with duplicate id', () => {
      chart.addSeries(seriesOne);

      expect(() => chart.addSeries(seriesOne)).toThrow();
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
