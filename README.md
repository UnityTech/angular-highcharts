# AngularJS-Highcharts

This library aims to provide a lightweight wrapper around Highcharts.

Check [the demo](demo/usage-demo.component.js) for usage example.

## Install
```
npm install angularjs-highcharts -S
```

## Import

Browserify:

```javascript
const HighChart = require('angular-highcharts');
```

Webpack:

```javascript
import HighChart from 'angular-highcharts';
```

From a CDN:
```javascript
<script src="https://unpkg.com/angularjs-highcharts@0.3.0/dist/angular-highcharts.js"></script>
```

## Quick reference

```javascript
const highchartsConfig = {
  chart: {
    type: 'area',
  },
  title: {
    text: 'Simple chart',
  },
};

const fooSeries = {
  id: 'foo',
  data: [
    [1, 3],
    [2, 2],
  ],
};

const barSeries = {
  id: 'bar',
  data: [
    [2, 1],
    [1, 0],
  ],
};

// This example utilizes angular.component(), but nothing stops you from using the
// same code (contents of $onInit() method) in a directive, or in a controller
// bound to a template by ng-controller, or by a router
app.component('myComponent', {
  controller: function() {
    const $ctrl = this;

    $ctrl.$onInit() {
      // Initialize new chart
      const chart = new HighChart(highchartsConfig);

      // Add one data series
      chart.addSeries(fooSeries);

      // Add multiple data series in one go
      chart.addSeries(fooSeries, barSeries);

      // Remove all series in a chart
      chart.removeAllSeries();
    };
  },
  template: `
    <chart
      chart="$ctrl.chart">
    </chart>
  `
});
```

## FAQ

### How to ensure the chart always takes full width of its container?

For least headache, use both of the following:

**Simple case**

Add the following CSS to your project:
```css
chart {
  display: block;
}
```

**More complex case**

In certain scenarios, when chart component is rendered inside an element with `display: none`, Highcharts will default to 600px x 400px for its size. This happens, for example, when placing the chart inside a tab, or in a component rendered conditionally by an `ng-if`.

Here's a [fiddle](http://jsfiddle.net/maciejgurban/emLLmofu/) demonstrating the issue and the solution to it.

Highcharts provides a method to manually _reflow_ the chart, which takes care of refitting it into its container without redrawing its contents. This method should be called at the point of execution at which we're sure the element containing the chart has finished rendering.

There are two options: either to trigger the reflow manually, or call it within a callback passed to `$timeout()` service.

Example:
```javascript
const chart = new HighChart({});
$timeout(() => {
  $window.Highcharts.charts.filter(chart => chart).forEach(chart => chart.reflow());
});
```

## Development
Clone project repo, and inside its directory, execute:
```
npm install
```

### Run unit tests
```
npm test
```

### Run the dev environment
```
npm run watch
```

## Dependencies
+ Angular 1.5+
+ Highcharts 4+
+ Babel polyfill

The easiest way is to install and import the Babel polyfill package, but you can also explicitly import only what's needed, which is:
+ [Array.find()](https://github.com/zloirock/core-js/blob/v2.4.1/modules/es6.array.find.js)
+ [Array.findIndex()](https://github.com/zloirock/core-js/blob/v2.4.1/modules/es6.array.find-index.js)
+ [Array.forEach()](https://github.com/zloirock/core-js/blob/v2.4.1/modules/es6.array.for-each.js)
