(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-scale')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-scale'], factory) :
  (factory((global.vx = global.vx || {}),global.d3));
}(this, (function (exports,d3Scale) { 'use strict';

  var band = (function (_ref) {
    var range = _ref.range,
        rangeRound = _ref.rangeRound,
        domain = _ref.domain,
        padding = _ref.padding,
        paddingInner = _ref.paddingInner,
        paddingOuter = _ref.paddingOuter,
        align = _ref.align,
        tickFormat = _ref.tickFormat;

    var scale = d3Scale.scaleBand();

    if (range) scale.range(range);
    if (rangeRound) scale.rangeRound(rangeRound);
    if (domain) scale.domain(domain);
    if (padding) scale.padding(padding);
    if (paddingInner) scale.paddingInner(paddingInner);
    if (paddingOuter) scale.paddingOuter(paddingOuter);
    if (align) scale.align(align);
    if (tickFormat) scale.tickFormat = tickFormat;

    return scale;
  });

  var point = (function (_ref) {
    var range = _ref.range,
        rangeRound = _ref.rangeRound,
        domain = _ref.domain,
        padding = _ref.padding,
        align = _ref.align,
        _ref$nice = _ref.nice,
        nice = _ref$nice === undefined ? false : _ref$nice;

    var scale = d3Scale.scalePoint();

    if (range) scale.range(range);
    if (rangeRound) scale.rangeRound(rangeRound);
    if (domain) scale.domain(domain);
    if (nice) scale.nice();
    if (padding) scale.padding(padding);
    if (align) scale.align(align);

    return scale;
  });

  var linear = (function (_ref) {
    var range = _ref.range,
        rangeRound = _ref.rangeRound,
        domain = _ref.domain,
        _ref$nice = _ref.nice,
        nice = _ref$nice === undefined ? false : _ref$nice,
        _ref$clamp = _ref.clamp,
        clamp = _ref$clamp === undefined ? false : _ref$clamp;

    var scale = d3Scale.scaleLinear();

    if (range) scale.range(range);
    if (rangeRound) scale.rangeRound(rangeRound);
    if (domain) scale.domain(domain);
    if (nice) scale.nice();
    if (clamp) scale.clamp(true);

    return scale;
  });

  var time = (function (_ref) {
    var range = _ref.range,
        rangeRound = _ref.rangeRound,
        domain = _ref.domain,
        _ref$nice = _ref.nice,
        nice = _ref$nice === undefined ? false : _ref$nice,
        _ref$clamp = _ref.clamp,
        clamp = _ref$clamp === undefined ? false : _ref$clamp;

    var scale = d3Scale.scaleTime();

    if (range) scale.range(range);
    if (rangeRound) scale.rangeRound(rangeRound);
    if (domain) scale.domain(domain);
    if (nice) scale.nice();
    if (clamp) scale.clamp(true);

    return scale;
  });

  var utc = (function (_ref) {
    var range = _ref.range,
        rangeRound = _ref.rangeRound,
        domain = _ref.domain,
        _ref$nice = _ref.nice,
        nice = _ref$nice === undefined ? false : _ref$nice,
        _ref$clamp = _ref.clamp,
        clamp = _ref$clamp === undefined ? false : _ref$clamp;

    var scale = d3Scale.scaleUtc();

    if (range) scale.range(range);
    if (rangeRound) scale.rangeRound(rangeRound);
    if (domain) scale.domain(domain);
    if (nice) scale.nice();
    if (clamp) scale.clamp(true);

    return scale;
  });

  var log = (function (_ref) {
    var range = _ref.range,
        rangeRound = _ref.rangeRound,
        domain = _ref.domain,
        base = _ref.base,
        _ref$nice = _ref.nice,
        nice = _ref$nice === undefined ? false : _ref$nice,
        _ref$clamp = _ref.clamp,
        clamp = _ref$clamp === undefined ? false : _ref$clamp;

    var scale = d3Scale.scaleLog();

    if (range) scale.range(range);
    if (rangeRound) scale.rangeRound(rangeRound);
    if (domain) scale.domain(domain);
    if (nice) scale.nice();
    if (clamp) scale.clamp(true);
    if (base) scale.base(base);

    return scale;
  });

  var power = (function (_ref) {
    var range = _ref.range,
        rangeRound = _ref.rangeRound,
        domain = _ref.domain,
        exponent = _ref.exponent,
        _ref$nice = _ref.nice,
        nice = _ref$nice === undefined ? false : _ref$nice,
        _ref$clamp = _ref.clamp,
        clamp = _ref$clamp === undefined ? false : _ref$clamp;

    var scale = d3Scale.scalePow();

    if (range) scale.range(range);
    if (rangeRound) scale.rangeRound(rangeRound);
    if (domain) scale.domain(domain);
    if (nice) scale.nice();
    if (clamp) scale.clamp(true);
    if (exponent) scale.exponent(exponent);

    return scale;
  });

  var ordinal = (function (_ref) {
    var range = _ref.range,
        domain = _ref.domain,
        unknown = _ref.unknown;

    var scale = d3Scale.scaleOrdinal();

    if (range) scale.range(range);
    if (domain) scale.domain(domain);
    if (unknown) scale.unknown(unknown);

    return scale;
  });

  var quantize = (function (_ref) {
    var range = _ref.range,
        domain = _ref.domain,
        ticks = _ref.ticks,
        tickFormat = _ref.tickFormat,
        _ref$nice = _ref.nice,
        nice = _ref$nice === undefined ? false : _ref$nice;

    var scale = d3Scale.scaleQuantize();

    if (range) scale.range(range);
    if (domain) scale.domain(domain);
    if (nice) scale.nice();
    if (ticks) scale.ticks(ticks);
    if (tickFormat) scale.tickFormat(tickFormat);

    return scale;
  });

  var quantile = (function (_ref) {
    var range = _ref.range,
        domain = _ref.domain;

    var scale = d3Scale.scaleQuantile();

    if (range) scale.range(range);
    if (domain) scale.domain(domain);

    return scale;
  });

  var threshold = (function (_ref) {
    var range = _ref.range,
        domain = _ref.domain;

    var scale = d3Scale.scaleThreshold();

    if (range) scale.range(range);
    if (domain) scale.domain(domain);

    return scale;
  });

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  function updateScale(scale, _ref) {
    var args = objectWithoutProperties(_ref, []);

    var nextScale = scale.copy();
    Object.keys(args).forEach(function (key) {
      if (nextScale.hasOwnProperty(key)) nextScale[key](args[key]);
    });
    return nextScale;
  }

  exports.scaleBand = band;
  exports.scalePoint = point;
  exports.scaleLinear = linear;
  exports.scaleTime = time;
  exports.scaleUtc = utc;
  exports.scaleLog = log;
  exports.scalePower = power;
  exports.scaleOrdinal = ordinal;
  exports.scaleQuantize = quantize;
  exports.scaleQuantile = quantile;
  exports.scaleThreshold = threshold;
  exports.updateScale = updateScale;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
