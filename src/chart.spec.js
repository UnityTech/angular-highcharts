import Chart from './chart';

describe('Chart', () => {
  beforeEach(angular.mock.module('angularHighcharts'));

  it('initializes', () => {
    expect(Chart).toBeDefined();
  });
});
