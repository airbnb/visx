(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(
        exports,
        require('react'),
        require('classnames'),
        require('d3-shape'),
        require('@vx/group'),
        require('prop-types'),
        require('@vx/point'),
        require('@vx/curve'),
        require('d3-path')
      )
    : typeof define === 'function' && define.amd
      ? define([
          'exports',
          'react',
          'classnames',
          'd3-shape',
          '@vx/group',
          'prop-types',
          '@vx/point',
          '@vx/curve',
          'd3-path'
        ], factory)
      : factory((global.vx = global.vx || {}), null, null, null, null, null, null, null, null);
})(this, function(exports, React, cx, d3Shape, group, PropTypes, point, curve, d3Path) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  cx = cx && cx.hasOwnProperty('default') ? cx['default'] : cx;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  function callOrValue(maybeFn, data) {
    if (typeof maybeFn === 'function') {
      return maybeFn(data);
    }
    return maybeFn;
  }

  function additionalProps(restProps, data) {
    return Object.keys(restProps).reduce(function(ret, cur) {
      ret[cur] = callOrValue(restProps[cur], data);
      return ret;
    }, {});
  }

  var _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  var objectWithoutProperties = function(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  function Arc(_ref) {
    var className = _ref.className,
      data = _ref.data,
      centroid = _ref.centroid,
      innerRadius = _ref.innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius,
      restProps = objectWithoutProperties(_ref, [
        'className',
        'data',
        'centroid',
        'innerRadius',
        'outerRadius',
        'cornerRadius',
        'startAngle',
        'endAngle',
        'padAngle',
        'padRadius'
      ]);

    var arc = d3Shape.arc();
    if (centroid) arc.centroid(centroid);
    if (innerRadius) arc.innerRadius(innerRadius);
    if (outerRadius) arc.outerRadius(outerRadius);
    if (cornerRadius) arc.cornerRadius(cornerRadius);
    if (startAngle) arc.startAngle(startAngle);
    if (endAngle) arc.endAngle(endAngle);
    if (padAngle) arc.padAngle(padAngle);
    if (padRadius) arc.padRadius(padRadius);
    return React.createElement(
      'path',
      _extends(
        { className: cx('vx-arc', className), d: arc(data) },
        additionalProps(restProps, data)
      )
    );
  }

  function Pie(_ref) {
    var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$top = _ref.top,
      top = _ref$top === undefined ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === undefined ? 0 : _ref$left,
      data = _ref.data,
      centroid = _ref.centroid,
      _ref$innerRadius = _ref.innerRadius,
      innerRadius = _ref$innerRadius === undefined ? 0 : _ref$innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      _ref$startAngle = _ref.startAngle,
      startAngle = _ref$startAngle === undefined ? 0 : _ref$startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius,
      pieSort = _ref.pieSort,
      pieSortValues = _ref.pieSortValues,
      pieValue = _ref.pieValue,
      restProps = objectWithoutProperties(_ref, [
        'className',
        'top',
        'left',
        'data',
        'centroid',
        'innerRadius',
        'outerRadius',
        'cornerRadius',
        'startAngle',
        'endAngle',
        'padAngle',
        'padRadius',
        'pieSort',
        'pieSortValues',
        'pieValue'
      ]);

    var path = d3Shape.arc();
    path.innerRadius(innerRadius);
    if (outerRadius) path.outerRadius(outerRadius);
    if (cornerRadius) path.cornerRadius(cornerRadius);
    if (padRadius) path.padRadius(padRadius);
    var pie = d3Shape.pie();
    if (pieSort) pie.sort(pieSort);
    if (pieSortValues) pie.sortValues(pieSortValues);
    if (pieValue) pie.value(pieValue);
    if (padAngle != null) pie.padAngle(padAngle);
    if (startAngle != null) pie.startAngle(startAngle);
    if (endAngle != null) pie.endAngle(endAngle);
    var arcs = pie(data);
    return React.createElement(
      group.Group,
      { className: 'vx-pie-arcs-group', top: top, left: left },
      arcs.map(function(arc, i) {
        var c = void 0;
        if (centroid) c = path.centroid(arc);
        return React.createElement(
          'g',
          { key: 'pie-arc-' + i },
          React.createElement(
            'path',
            _extends(
              {
                className: cx('vx-pie-arc', className),
                d: path(arc)
              },
              additionalProps(
                restProps,
                _extends({}, arc, {
                  index: i,
                  centroid: c
                })
              )
            )
          ),
          centroid && centroid(c, arc)
        );
      })
    );
  }

  Line.propTypes = {
    innerRef: PropTypes.func
  };

  function Line(_ref) {
    var _ref$from = _ref.from,
      from = _ref$from === undefined ? new point.Point({ x: 0, y: 0 }) : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === undefined ? new point.Point({ x: 1, y: 1 }) : _ref$to,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'black' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 1 : _ref$strokeWidth,
      _ref$strokeDasharray = _ref.strokeDasharray,
      strokeDasharray = _ref$strokeDasharray === undefined ? '' : _ref$strokeDasharray,
      _ref$transform = _ref.transform,
      transform = _ref$transform === undefined ? '' : _ref$transform,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      data = _ref.data,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, [
        'from',
        'to',
        'stroke',
        'strokeWidth',
        'strokeDasharray',
        'transform',
        'className',
        'data',
        'innerRef'
      ]);

    return React.createElement(
      'line',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-line', className),
          x1: from.x,
          y1: from.y,
          x2: to.x,
          y2: to.y,
          stroke: stroke,
          strokeWidth: strokeWidth,
          strokeDasharray: strokeDasharray,
          transform: transform
        },
        additionalProps(restProps, data)
      )
    );
  }

  LinePath.propTypes = {
    innerRef: PropTypes.func
  };

  function LinePath(_ref) {
    var data = _ref.data,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      x = _ref.x,
      y = _ref.y,
      _ref$defined = _ref.defined,
      defined =
        _ref$defined === undefined
          ? function() {
              return true;
            }
          : _ref$defined,
      className = _ref.className,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'steelblue' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 2 : _ref$strokeWidth,
      _ref$strokeDasharray = _ref.strokeDasharray,
      strokeDasharray = _ref$strokeDasharray === undefined ? '' : _ref$strokeDasharray,
      _ref$strokeDashoffset = _ref.strokeDashoffset,
      strokeDashoffset = _ref$strokeDashoffset === undefined ? 0 : _ref$strokeDashoffset,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'none' : _ref$fill,
      _ref$curve = _ref.curve,
      curve$$1 = _ref$curve === undefined ? curve.curveLinear : _ref$curve,
      glyph = _ref.glyph,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, [
        'data',
        'xScale',
        'yScale',
        'x',
        'y',
        'defined',
        'className',
        'stroke',
        'strokeWidth',
        'strokeDasharray',
        'strokeDashoffset',
        'fill',
        'curve',
        'glyph',
        'innerRef'
      ]);

    var path = d3Shape
      .line()
      .x(function(d) {
        return xScale(x(d));
      })
      .y(function(d) {
        return yScale(y(d));
      })
      .defined(defined)
      .curve(curve$$1);
    return React.createElement(
      'g',
      null,
      React.createElement(
        'path',
        _extends(
          {
            ref: innerRef,
            className: cx('vx-linepath', className),
            d: path(data),
            stroke: stroke,
            strokeWidth: strokeWidth,
            strokeDasharray: strokeDasharray,
            strokeDashoffset: strokeDashoffset,
            fill: fill
          },
          additionalProps(restProps, data)
        )
      ),
      glyph && React.createElement('g', { className: 'vx-linepath-glyphs' }, data.map(glyph))
    );
  }

  LineRadial.propTypes = {
    innerRef: PropTypes.func
  };

  function LineRadial(_ref) {
    var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      angle = _ref.angle,
      radius = _ref.radius,
      defined = _ref.defined,
      curve$$1 = _ref.curve,
      data = _ref.data,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, [
        'className',
        'angle',
        'radius',
        'defined',
        'curve',
        'data',
        'innerRef'
      ]);

    var path = d3Shape.radialLine();
    if (angle) path.angle(angle);
    if (radius) path.radius(radius);
    if (defined) path.defined(defined);
    if (curve$$1) path.curve(curve$$1);
    return React.createElement(
      'g',
      null,
      React.createElement(
        'path',
        _extends(
          {
            ref: innerRef,
            className: cx('vx-line-radial', className),
            d: path(data)
          },
          additionalProps(restProps, data)
        )
      )
    );
  }

  Area.propTypes = {
    x: PropTypes.func,
    x0: PropTypes.func,
    x1: PropTypes.func,
    y: PropTypes.func,
    y0: PropTypes.func,
    y1: PropTypes.func,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    data: PropTypes.array,
    defined: PropTypes.func,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array
    ]),
    innerRef: PropTypes.func,
    strokeDasharray: PropTypes.string,
    strokeWidth: PropTypes.number,
    stroke: PropTypes.string,
    fill: PropTypes.string,
    curve: PropTypes.func
  };

  function Area(_ref) {
    var children = _ref.children,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y = _ref.y,
      y0 = _ref.y0,
      y1 = _ref.y1,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      _ref$defined = _ref.defined,
      defined =
        _ref$defined === undefined
          ? function() {
              return true;
            }
          : _ref$defined,
      className = _ref.className,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 2 : _ref$strokeWidth,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'black' : _ref$stroke,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'rgba(0,0,0,0.3)' : _ref$fill,
      curve$$1 = _ref.curve,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, [
        'children',
        'x',
        'x0',
        'x1',
        'y',
        'y0',
        'y1',
        'xScale',
        'yScale',
        'data',
        'defined',
        'className',
        'strokeDasharray',
        'strokeWidth',
        'stroke',
        'fill',
        'curve',
        'innerRef'
      ]);

    var path = d3Shape.area();
    if (x)
      path.x(function(d) {
        return xScale(x(d));
      });
    if (x0)
      path.x0(function(d) {
        return xScale(x0(d));
      });
    if (x1)
      path.x1(function(d) {
        return xScale(x1(d));
      });
    if (y)
      path.y(function(d) {
        return yScale(y(d));
      });
    if (y0)
      path.y0(function(d) {
        return yScale(y0(d));
      });
    if (y1)
      path.y1(function(d) {
        return yScale(y1(d));
      });
    if (defined) path.defined(defined);
    if (curve$$1) path.curve(curve$$1);
    if (children) return children({ path: path });
    return React.createElement(
      'g',
      null,
      React.createElement(
        'path',
        _extends(
          {
            ref: innerRef,
            className: cx('vx-area', className),
            d: path(data),
            stroke: stroke,
            strokeWidth: strokeWidth,
            strokeDasharray: strokeDasharray,
            fill: fill
          },
          additionalProps(restProps, data)
        )
      )
    );
  }

  AreaClosed.propTypes = {
    innerRef: PropTypes.func
  };

  function AreaClosed(_ref) {
    var x = _ref.x,
      y = _ref.y,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      data = _ref.data,
      _ref$defined = _ref.defined,
      defined =
        _ref$defined === undefined
          ? function() {
              return true;
            }
          : _ref$defined,
      className = _ref.className,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 2 : _ref$strokeWidth,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'black' : _ref$stroke,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'rgba(0,0,0,0.3)' : _ref$fill,
      curve$$1 = _ref.curve,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, [
        'x',
        'y',
        'xScale',
        'yScale',
        'data',
        'defined',
        'className',
        'strokeDasharray',
        'strokeWidth',
        'stroke',
        'fill',
        'curve',
        'innerRef'
      ]);

    var path = d3Shape
      .area()
      .x(function(d) {
        return xScale(x(d));
      })
      .y0(yScale.range()[0])
      .y1(function(d) {
        return yScale(y(d));
      })
      .defined(defined);
    if (curve$$1) path.curve(curve$$1);
    return React.createElement(
      'g',
      null,
      React.createElement(
        'path',
        _extends(
          {
            ref: innerRef,
            className: cx('vx-area-closed', className),
            d: path(data),
            stroke: stroke,
            strokeWidth: strokeWidth,
            strokeDasharray: strokeDasharray,
            fill: fill
          },
          additionalProps(restProps, data)
        )
      )
    );
  }

  function AreaStack(_ref) {
    var className = _ref.className,
      _ref$top = _ref.top,
      _ref$left = _ref.left,
      keys = _ref.keys,
      data = _ref.data,
      curve$$1 = _ref.curve,
      defined = _ref.defined,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y0 = _ref.y0,
      y1 = _ref.y1,
      glyph = _ref.glyph,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
      restProps = objectWithoutProperties(_ref, [
        'className',
        'top',
        'left',
        'keys',
        'data',
        'curve',
        'defined',
        'x',
        'x0',
        'x1',
        'y0',
        'y1',
        'glyph',
        'reverse'
      ]);

    var stack = d3Shape.stack();
    if (keys) stack.keys(keys);

    var path = d3Shape.area();
    if (x) path.x(x);
    if (x0) path.x0(x0);
    if (x1) path.x1(x1);
    if (y0) path.y0(y0);
    if (y1) path.y1(y1);
    if (curve$$1) path.curve(curve$$1);
    if (defined) path.defined(defined);

    var seriesData = stack(data);
    if (reverse) seriesData.reverse();

    return React.createElement(
      'g',
      null,
      seriesData.map(function(series, i) {
        return React.createElement(
          'path',
          _extends(
            {
              className: cx('vx-area-stack', className),
              key: 'area-stack-' + i + '-' + (series.key || ''),
              d: path(series)
            },
            additionalProps(restProps, {
              datum: series[i],
              index: i,
              series: series
            })
          )
        );
      }),
      !!glyph && React.createElement('g', { className: 'vx-area-stack-glyphs' }, data.map(glyph))
    );
  }

  Bar.propTypes = {
    innerRef: PropTypes.func
  };

  function Bar(_ref) {
    var className = _ref.className,
      innerRef = _ref.innerRef,
      data = _ref.data,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      width = _ref.width,
      height = _ref.height,
      rx = _ref.rx,
      ry = _ref.ry,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'steelblue' : _ref$fill,
      fillOpacity = _ref.fillOpacity,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      strokeLinejoin = _ref.strokeLinejoin,
      strokeMiterlimit = _ref.strokeMiterlimit,
      strokeOpacity = _ref.strokeOpacity,
      restProps = objectWithoutProperties(_ref, [
        'className',
        'innerRef',
        'data',
        'x',
        'y',
        'width',
        'height',
        'rx',
        'ry',
        'fill',
        'fillOpacity',
        'stroke',
        'strokeWidth',
        'strokeDasharray',
        'strokeLinecap',
        'strokeLinejoin',
        'strokeMiterlimit',
        'strokeOpacity'
      ]);

    return React.createElement(
      'rect',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-bar', className),
          x: x,
          y: y,
          width: width,
          height: height,
          rx: rx,
          ry: ry,
          fill: fill,
          fillOpacity: fillOpacity,
          stroke: stroke,
          strokeWidth: strokeWidth,
          strokeDasharray: strokeDasharray,
          strokeLinecap: strokeLinecap,
          strokeLinejoin: strokeLinejoin,
          strokeMiterlimit: strokeMiterlimit,
          strokeOpacity: strokeOpacity
        },
        additionalProps(restProps, data)
      )
    );
  }

  function BarGroup(_ref) {
    var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x0 = _ref.x0,
      x0Scale = _ref.x0Scale,
      x1Scale = _ref.x1Scale,
      yScale = _ref.yScale,
      zScale = _ref.zScale,
      keys = _ref.keys,
      height = _ref.height,
      restProps = objectWithoutProperties(_ref, [
        'data',
        'className',
        'top',
        'left',
        'x0',
        'x0Scale',
        'x1Scale',
        'yScale',
        'zScale',
        'keys',
        'height'
      ]);

    var format = x0Scale.tickFormat
      ? x0Scale.tickFormat()
      : function(d) {
          return d;
        };
    return React.createElement(
      group.Group,
      { className: cx('vx-bar-group', className), top: top, left: left },
      data &&
        data.map(function(d, i) {
          return React.createElement(
            group.Group,
            { key: 'bar-group-' + i + '-' + x0(d), left: x0Scale(x0(d)) },
            keys &&
              keys.map(function(key, i) {
                var value = d[key];
                return React.createElement(
                  Bar,
                  _extends(
                    {
                      key: 'bar-group-bar-' + i + '-' + value + '-' + key,
                      x: x1Scale(key),
                      y: yScale(value),
                      width: x1Scale.bandwidth(),
                      height: height - yScale(value),
                      fill: zScale(key),
                      data: {
                        key: key,
                        value: value,
                        x: format(x0(d)),
                        data: d
                      }
                    },
                    restProps
                  )
                );
              })
          );
        })
    );
  }

  BarGroup.propTypes = {
    data: PropTypes.array.isRequired,
    x0: PropTypes.func.isRequired,
    x0Scale: PropTypes.func.isRequired,
    x1Scale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    zScale: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    className: PropTypes.string,
    top: PropTypes.number,
    left: PropTypes.number
  };

  function BarStack(_ref) {
    var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x = _ref.x,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      zScale = _ref.zScale,
      keys = _ref.keys,
      height = _ref.height,
      restProps = objectWithoutProperties(_ref, [
        'data',
        'className',
        'top',
        'left',
        'x',
        'xScale',
        'yScale',
        'zScale',
        'keys',
        'height'
      ]);

    var series = d3Shape.stack().keys(keys)(data);
    var format = xScale.tickFormat
      ? xScale.tickFormat()
      : function(d) {
          return d;
        };
    var bandwidth = xScale.bandwidth();
    var step = xScale.step();
    var paddingInner = xScale.paddingInner();
    var paddingOuter = xScale.paddingOuter();
    return React.createElement(
      group.Group,
      { className: cx('vx-bar-stack', className), top: top, left: left },
      series &&
        series.map(function(s, i) {
          return React.createElement(
            group.Group,
            { key: 'vx-bar-stack-' + i },
            s.map(function(d, ii) {
              var barHeight = yScale(d[0]) - yScale(d[1]);
              return React.createElement(
                Bar,
                _extends(
                  {
                    key: 'bar-group-bar-' + i + '-' + ii + '-' + s.key,
                    x: xScale(x(d.data)),
                    y: yScale(d[1]),
                    width: bandwidth,
                    height: barHeight,
                    fill: zScale(s.key),
                    data: {
                      bandwidth: bandwidth,
                      paddingInner: paddingInner,
                      paddingOuter: paddingOuter,
                      step: step,
                      key: s.key,
                      value: d[1],
                      height: barHeight,
                      width: bandwidth,
                      x: x(d.data),
                      xFormatted: format(x(d.data)),
                      data: d.data
                    }
                  },
                  restProps
                )
              );
            })
          );
        })
    );
  }

  BarStack.propTypes = {
    data: PropTypes.array.isRequired,
    x: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    zScale: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired,
    className: PropTypes.string,
    top: PropTypes.number,
    left: PropTypes.number
  };

  function BarStackHorizontal(_ref) {
    var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      y = _ref.y,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      zScale = _ref.zScale,
      keys = _ref.keys,
      height = _ref.height,
      restProps = objectWithoutProperties(_ref, [
        'data',
        'className',
        'top',
        'left',
        'y',
        'xScale',
        'yScale',
        'zScale',
        'keys',
        'height'
      ]);

    var series = d3Shape.stack().keys(keys)(data);
    var format = yScale.tickFormat
      ? yScale.tickFormat()
      : function(d) {
          return d;
        };
    var bandwidth = yScale.bandwidth();
    var step = yScale.step();
    var paddingInner = yScale.paddingInner();
    var paddingOuter = yScale.paddingOuter();
    return React.createElement(
      group.Group,
      { className: cx('vx-bar-stack-horizontal', className), top: top, left: left },
      series &&
        series.map(function(s, i) {
          return React.createElement(
            group.Group,
            { key: 'vx-bar-stack-horizontal-' + i },
            s.map(function(d, ii) {
              var barWidth = xScale(d[1]) - xScale(d[0]);
              return React.createElement(
                Bar,
                _extends(
                  {
                    key: 'bar-group-bar-' + i + '-' + ii + '-' + s.key,
                    x: xScale(d[0]),
                    y: yScale(y(d.data)),
                    width: barWidth,
                    height: bandwidth,
                    fill: zScale(s.key),
                    data: {
                      bandwidth: bandwidth,
                      paddingInner: paddingInner,
                      paddingOuter: paddingOuter,
                      step: step,
                      key: s.key,
                      value: d[0],
                      height: bandwidth,
                      width: barWidth,
                      y: y(d.data),
                      yFormatted: format(y(d.data)),
                      data: d.data
                    }
                  },
                  restProps
                )
              );
            })
          );
        })
    );
  }

  BarStackHorizontal.propTypes = {
    data: PropTypes.array.isRequired,
    y: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    zScale: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired,
    className: PropTypes.string,
    top: PropTypes.number,
    left: PropTypes.number
  };

  var STACK_ORDERS = {
    ascending: d3Shape.stackOrderAscending,
    descending: d3Shape.stackOrderDescending,
    insideout: d3Shape.stackOrderInsideOut,
    none: d3Shape.stackOrderNone,
    reverse: d3Shape.stackOrderReverse
  };

  var STACK_ORDER_NAMES = Object.keys(STACK_ORDERS);

  function stackOrder(order) {
    return STACK_ORDERS[order] || STACK_ORDERS.none;
  }

  var STACK_OFFSETS = {
    expand: d3Shape.stackOffsetExpand,
    diverging: d3Shape.stackOffsetDiverging,
    none: d3Shape.stackOffsetNone,
    silhouette: d3Shape.stackOffsetSilhouette,
    wiggle: d3Shape.stackOffsetWiggle
  };

  var STACK_OFFSET_NAMES = Object.keys(STACK_OFFSETS);

  function stackOffset(offset) {
    return STACK_OFFSETS[offset] || STACK_OFFSETS.none;
  }

  function Stack(_ref) {
    var className = _ref.className,
      _ref$top = _ref.top,
      top = _ref$top === undefined ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === undefined ? 0 : _ref$left,
      keys = _ref.keys,
      data = _ref.data,
      curve$$1 = _ref.curve,
      defined = _ref.defined,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y0 = _ref.y0,
      y1 = _ref.y1,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      render = _ref.render,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
      restProps = objectWithoutProperties(_ref, [
        'className',
        'top',
        'left',
        'keys',
        'data',
        'curve',
        'defined',
        'x',
        'x0',
        'x1',
        'y0',
        'y1',
        'value',
        'order',
        'offset',
        'render',
        'reverse'
      ]);

    var stack = d3Shape.stack();
    if (keys) stack.keys(keys);
    if (value) stack.value(value);
    if (order) stack.order(stackOrder(order));
    if (offset) stack.offset(stackOffset(offset));

    var path = d3Shape.area();
    if (x) path.x(x);
    if (x0) path.x0(x0);
    if (x1) path.x1(x1);
    if (y0) path.y0(y0);
    if (y1) path.y1(y1);
    if (curve$$1) path.curve(curve$$1);
    if (defined) path.defined(defined);

    var seriesData = stack(data);
    if (reverse) seriesData.reverse();

    if (render)
      return React.createElement(
        group.Group,
        { top: top, left: left },
        render({ seriesData: seriesData, path: path })
      );

    return React.createElement(
      group.Group,
      { top: top, left: left },
      seriesData.map(function(series, i) {
        return React.createElement(
          'path',
          _extends(
            {
              className: cx('vx-stack', className),
              key: 'stack-' + i + '-' + (series.key || ''),
              d: path(series)
            },
            additionalProps(restProps, {
              datum: series[i],
              index: i,
              series: series
            })
          )
        );
      })
    );
  }

  function pathHorizontalDiagonal(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

    return function(data) {
      var link = d3Shape.linkHorizontal();
      link.x(x);
      link.y(y);
      link.source(source);
      link.target(target);
      return link(data);
    };
  }

  LinkHorizontal.propTypes = {
    innerRef: PropTypes.func,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkHorizontal(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target'
      ]);

    path = path || pathHorizontalDiagonal({ source: source, target: target, x: x, y: y });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link-horizontal', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathVerticalDiagonal(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

    return function(data) {
      var link = d3Shape.linkVertical();
      link.x(x);
      link.y(y);
      link.source(source);
      link.target(target);
      return link(data);
    };
  }

  LinkVertical.propTypes = {
    innerRef: PropTypes.func,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkVertical(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target'
      ]);

    path = path || pathVerticalDiagonal({ source: source, target: target, x: x, y: y });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link-vertical', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathRadialDiagonal(_ref) {
    var source = _ref.source,
      target = _ref.target,
      angle = _ref.angle,
      radius = _ref.radius;

    return function(data) {
      var link = d3Shape.linkRadial();
      link.angle(angle);
      link.radius(radius);
      link.source(source);
      link.target(target);
      return link(data);
    };
  }

  LinkRadial.propTypes = {
    innerRef: PropTypes.func,
    angle: PropTypes.func,
    radius: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkRadial(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$angle = _ref2.angle,
      angle =
        _ref2$angle === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$angle,
      _ref2$radius = _ref2.radius,
      radius =
        _ref2$radius === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$radius,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'angle',
        'radius',
        'source',
        'target'
      ]);

    path =
      path || pathRadialDiagonal({ source: source, target: target, angle: angle, radius: radius });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link-radius', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathHorizontalCurve(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sx = x(sourceData);
      var sy = y(sourceData);
      var tx = x(targetData);
      var ty = y(targetData);

      var dx = tx - sx;
      var dy = ty - sy;
      var ix = percent * (dx + dy);
      var iy = percent * (dy - dx);

      var path = d3Path.path();
      path.moveTo(sx, sy);
      path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

      return path.toString();
    };
  }

  LinkHorizontalCurve.propTypes = {
    innerRef: PropTypes.func,
    percent: PropTypes.number,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkHorizontalCurve(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.2 : _ref2$percent,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target',
        'percent'
      ]);

    path =
      path || pathHorizontalCurve({ source: source, target: target, x: x, y: y, percent: percent });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathVerticalCurve(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sx = x(sourceData);
      var sy = y(sourceData);
      var tx = x(targetData);
      var ty = y(targetData);

      var dx = tx - sx;
      var dy = ty - sy;
      var ix = percent * (dx + dy);
      var iy = percent * (dy - dx);

      var path = d3Path.path();
      path.moveTo(sx, sy);
      path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

      return path.toString();
    };
  }

  LinkVerticalCurve.propTypes = {
    innerRef: PropTypes.func,
    percent: PropTypes.number,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkVerticalCurve(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.2 : _ref2$percent,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target',
        'percent'
      ]);

    path =
      path || pathVerticalCurve({ source: source, target: target, x: x, y: y, percent: percent });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathRadialCurve(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sa = x(sourceData) - Math.PI / 2;
      var sr = y(sourceData);
      var ta = x(targetData) - Math.PI / 2;
      var tr = y(targetData);

      var sc = Math.cos(sa);
      var ss = Math.sin(sa);
      var tc = Math.cos(ta);
      var ts = Math.sin(ta);

      var sx = sr * sc;
      var sy = sr * ss;
      var tx = tr * tc;
      var ty = tr * ts;

      var dx = tx - sx;
      var dy = ty - sy;
      var ix = percent * (dx + dy);
      var iy = percent * (dy - dx);

      var path = d3Path.path();
      path.moveTo(sx, sy);
      path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

      return path.toString();
    };
  }

  LinkRadialCurve.propTypes = {
    innerRef: PropTypes.func,
    percent: PropTypes.number,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkRadialCurve(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.2 : _ref2$percent,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target',
        'percent'
      ]);

    path =
      path || pathRadialCurve({ source: source, target: target, x: x, y: y, percent: percent });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathHorizontalLine(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sx = x(sourceData);
      var sy = y(sourceData);
      var tx = x(targetData);
      var ty = y(targetData);

      var path = d3Path.path();
      path.moveTo(sx, sy);
      path.lineTo(tx, ty);

      return path.toString();
    };
  }

  LinkHorizontalLine.propTypes = {
    innerRef: PropTypes.func,
    path: PropTypes.func,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func
  };

  function LinkHorizontalLine(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target'
      ]);

    path = path || pathHorizontalLine({ source: source, target: target, x: x, y: y });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathVerticalLine(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sx = x(sourceData);
      var sy = y(sourceData);
      var tx = x(targetData);
      var ty = y(targetData);

      var path = d3Path.path();
      path.moveTo(sx, sy);
      path.lineTo(tx, ty);

      return path.toString();
    };
  }

  LinkVerticalLine.propTypes = {
    innerRef: PropTypes.func,
    path: PropTypes.func,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func
  };

  function LinkVerticalLine(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target'
      ]);

    path = path || pathVerticalLine({ source: source, target: target, x: x, y: y });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathRadialLine(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sa = x(sourceData) - Math.PI / 2;
      var sr = y(sourceData);
      var ta = x(targetData) - Math.PI / 2;
      var tr = y(targetData);

      var sc = Math.cos(sa);
      var ss = Math.sin(sa);
      var tc = Math.cos(ta);
      var ts = Math.sin(ta);

      var path = d3Path.path();
      path.moveTo(sr * sc, sr * ss);
      path.lineTo(tr * tc, tr * ts);

      return path.toString();
    };
  }

  LinkRadialStep.propTypes = {
    innerRef: PropTypes.func,
    path: PropTypes.func,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func
  };

  function LinkRadialStep(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target'
      ]);

    path = path || pathRadialLine({ source: source, target: target, x: x, y: y });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathHorizontalStep(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sx = x(sourceData);
      var sy = y(sourceData);
      var tx = x(targetData);
      var ty = y(targetData);

      var path = d3Path.path();
      path.moveTo(sx, sy);
      path.lineTo(sx + (tx - sx) * percent, sy);
      path.lineTo(sx + (tx - sx) * percent, ty);
      path.lineTo(tx, ty);

      return path.toString();
    };
  }

  LinkHorizontalStep.propTypes = {
    innerRef: PropTypes.func,
    percent: PropTypes.number,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkHorizontalStep(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.5 : _ref2$percent,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'percent',
        'x',
        'y',
        'source',
        'target'
      ]);

    path =
      path || pathHorizontalStep({ source: source, target: target, x: x, y: y, percent: percent });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathVerticalStep(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sx = x(sourceData);
      var sy = y(sourceData);
      var tx = x(targetData);
      var ty = y(targetData);

      var path = d3Path.path();
      path.moveTo(sx, sy);
      path.lineTo(sx, sy + (ty - sy) * percent);
      path.lineTo(tx, sy + (ty - sy) * percent);
      path.lineTo(tx, ty);

      return path.toString();
    };
  }

  LinkVerticalStep.propTypes = {
    innerRef: PropTypes.func,
    percent: PropTypes.number,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkVerticalStep(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.5 : _ref2$percent,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'percent',
        'x',
        'y',
        'source',
        'target'
      ]);

    path =
      path || pathVerticalStep({ source: source, target: target, x: x, y: y, percent: percent });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  function pathRadialStep(_ref) {
    var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

    return function(data) {
      var sourceData = source(data);
      var targetData = target(data);

      var sx = x(sourceData);
      var sy = y(sourceData);
      var tx = x(targetData);
      var ty = y(targetData);

      var sa = sx - Math.PI / 2;
      var sr = sy;
      var ta = tx - Math.PI / 2;
      var tr = ty;

      var sc = Math.cos(sa);
      var ss = Math.sin(sa);
      var tc = Math.cos(ta);
      var ts = Math.sin(ta);
      var sf = Math.abs(ta - sa) > Math.PI ? ta <= sa : ta > sa;

      return (
        '\n      M' +
        sr * sc +
        ',' +
        sr * ss +
        '\n      A' +
        sr +
        ',' +
        sr +
        ',0,0,' +
        (sf ? 1 : 0) +
        ',' +
        sr * tc +
        ',' +
        sr * ts +
        '\n      L' +
        tr * tc +
        ',' +
        tr * ts +
        '\n    '
      );
    };
  }

  LinkRadialStep$1.propTypes = {
    innerRef: PropTypes.func,
    x: PropTypes.func,
    y: PropTypes.func,
    source: PropTypes.func,
    target: PropTypes.func,
    path: PropTypes.func
  };

  function LinkRadialStep$1(_ref2) {
    var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x =
        _ref2$x === undefined
          ? function(d) {
              return d.x;
            }
          : _ref2$x,
      _ref2$y = _ref2.y,
      y =
        _ref2$y === undefined
          ? function(d) {
              return d.y;
            }
          : _ref2$y,
      _ref2$source = _ref2.source,
      source =
        _ref2$source === undefined
          ? function(d) {
              return d.source;
            }
          : _ref2$source,
      _ref2$target = _ref2.target,
      target =
        _ref2$target === undefined
          ? function(d) {
              return d.target;
            }
          : _ref2$target,
      restProps = objectWithoutProperties(_ref2, [
        'className',
        'innerRef',
        'data',
        'path',
        'x',
        'y',
        'source',
        'target'
      ]);

    path = path || pathRadialStep({ source: source, target: target, x: x, y: y });
    return React.createElement(
      'path',
      _extends(
        {
          ref: innerRef,
          className: cx('vx-link', className),
          d: path(data)
        },
        additionalProps(restProps, data)
      )
    );
  }

  exports.Arc = Arc;
  exports.Pie = Pie;
  exports.Line = Line;
  exports.LinePath = LinePath;
  exports.LineRadial = LineRadial;
  exports.Area = Area;
  exports.AreaClosed = AreaClosed;
  exports.AreaStack = AreaStack;
  exports.Bar = Bar;
  exports.BarGroup = BarGroup;
  exports.BarStack = BarStack;
  exports.BarStackHorizontal = BarStackHorizontal;
  exports.Stack = Stack;
  exports.callOrValue = callOrValue;
  exports.stackOffset = stackOffset;
  exports.STACK_OFFSETS = STACK_OFFSETS;
  exports.STACK_OFFSET_NAMES = STACK_OFFSET_NAMES;
  exports.stackOrder = stackOrder;
  exports.STACK_ORDERS = STACK_ORDERS;
  exports.STACK_ORDER_NAMES = STACK_ORDER_NAMES;
  exports.LinkHorizontal = LinkHorizontal;
  exports.pathHorizontalDiagonal = pathHorizontalDiagonal;
  exports.LinkVertical = LinkVertical;
  exports.pathVerticalDiagonal = pathVerticalDiagonal;
  exports.LinkRadial = LinkRadial;
  exports.pathRadialDiagonal = pathRadialDiagonal;
  exports.LinkHorizontalCurve = LinkHorizontalCurve;
  exports.pathHorizontalCurve = pathHorizontalCurve;
  exports.LinkVerticalCurve = LinkVerticalCurve;
  exports.pathVerticalCurve = pathVerticalCurve;
  exports.LinkRadialCurve = LinkRadialCurve;
  exports.pathRadialCurve = pathRadialCurve;
  exports.LinkHorizontalLine = LinkHorizontalLine;
  exports.pathHorizontalLine = pathHorizontalLine;
  exports.LinkVerticalLine = LinkVerticalLine;
  exports.pathVerticalLine = pathVerticalLine;
  exports.LinkRadialLine = LinkRadialStep;
  exports.pathRadialLine = pathRadialLine;
  exports.LinkHorizontalStep = LinkHorizontalStep;
  exports.pathHorizontalStep = pathHorizontalStep;
  exports.LinkVerticalStep = LinkVerticalStep;
  exports.pathVerticalStep = pathVerticalStep;
  exports.LinkRadialStep = LinkRadialStep$1;
  exports.pathRadialStep = pathRadialStep;

  Object.defineProperty(exports, '__esModule', { value: true });
});
