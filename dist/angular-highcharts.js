(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularHighcharts = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var _chart = _dereq_('./chart.component');

var _chart2 = _interopRequireDefault(_chart);

var _chart3 = _dereq_('./chart');

var _chart4 = _interopRequireDefault(_chart3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('angularHighcharts', []).component('chart', _chart2.default);

module.exports = _chart4.default;

},{"./chart":3,"./chart.component":2}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChartComponent = function () {
  ChartComponent.$inject = ["$element"];
  function ChartComponent($element) {
    'ngInject';

    _classCallCheck(this, ChartComponent);

    this._$element = $element[0];
    this._instance = null;
    this._prevOptions = null;
  }

  _createClass(ChartComponent, [{
    key: '$onInit',
    value: function $onInit() {
      this.init();
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.destroy();
    }
  }, {
    key: '$doCheck',
    value: function $doCheck() {
      if (!angular.equals(this._prevOptions, this.chart.options)) {
        this.destroy();
        this.init();
        this._prevOptions = angular.copy(this.chart.options);
      }
    }
  }, {
    key: '$onChanges',
    value: function $onChanges(_ref) {
      var loading = _ref.loading;

      this.init();

      if (loading) {
        this.setLoading();
      }
    }
  }, {
    key: 'init',
    value: function init() {
      if (this._instance) {
        return;
      }
      this._instance = Highcharts.chart(this._$element, this.chart.options);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._instance) {
        this._instance.destroy();
        this._instance = null;
      }
    }
  }, {
    key: 'setLoading',
    value: function setLoading() {
      if (this.loading) {
        this._instance.showLoading();
      } else {
        this._instance.hideLoading();
      }
    }
  }]);

  return ChartComponent;
}();

exports.default = {
  controller: ChartComponent,
  bindings: {
    chart: '<',
    loading: '<'
  }
};

},{}],3:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _class);

    this.options = angular.copy(options);
  }

  _createClass(_class, [{
    key: "_findSeries",
    value: function _findSeries(id) {
      return this.options.series.find(function (series) {
        return series.id === id;
      });
    }
  }, {
    key: "_findSeriesIndex",
    value: function _findSeriesIndex(id) {
      return this.options.series.findIndex(function (series) {
        return series.id === id;
      });
    }
  }, {
    key: "_removeSeries",
    value: function _removeSeries(index) {
      this.options.series.splice(index, 1);
    }

    // Ensure series exist

  }, {
    key: "_initSeries",
    value: function _initSeries() {
      if (!this.options.series) {
        this.options.series = [];
      }
    }
  }, {
    key: "addSeries",
    value: function addSeries() {
      var _this = this;

      this._initSeries();

      for (var _len = arguments.length, series = Array(_len), _key = 0; _key < _len; _key++) {
        series[_key] = arguments[_key];
      }

      series.forEach(function (params) {
        if (_this._findSeries(params.id)) {
          throw new Error("Series with ID '" + params.id + "' already exists.");
        }
        _this.options.series.push(params);
      });
    }
  }, {
    key: "removeSeries",
    value: function removeSeries(id) {
      var index = this._findSeriesIndex(id);
      var seriesExists = index > -1;

      if (!seriesExists) {
        throw new Error("Series with ID '" + id + "' not found.");
      }

      this._removeSeries(index);
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}]},{},[1])(1)
});