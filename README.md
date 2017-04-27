This library aims to provide a lightweight wrapper around Highcharts.

Consult [the demo](demo/usage-demo.component.js) for usage example.


### Setup
Clone project repo, and inside its directory, execute:
```
npm install
```

### Run unit tests
```
npm test
```

### Run the dev task
```
npm run watch
```

### FAQ

#### How to ensure the chart always takes full width of its container?

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
import HighChart from 'angular-highcharts';

angular.controller('foo', () => {
  const chart = new HighChart({});
  $timeout(() => {
    $window.Highcharts.charts.filter(chart => chart).forEach(chart => chart.reflow());
  });
})
```

### Dependencies
+ Angular 1.5+
+ Highcharts 4+
