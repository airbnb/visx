"use strict";

exports.__esModule = true;
exports.default = Projection;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

var _d3Geo = require("d3-geo");

var _Graticule = _interopRequireDefault(require("../graticule/Graticule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var projectionMapping = {
  orthographic: function orthographic() {
    return (0, _d3Geo.geoOrthographic)();
  },
  albers: function albers() {
    return (0, _d3Geo.geoAlbers)();
  },
  albersUsa: function albersUsa() {
    return (0, _d3Geo.geoAlbersUsa)();
  },
  mercator: function mercator() {
    return (0, _d3Geo.geoMercator)();
  },
  naturalEarth: function naturalEarth() {
    return (0, _d3Geo.geoNaturalEarth1)();
  },
  equalEarth: function equalEarth() {
    return (0, _d3Geo.geoEqualEarth)();
  }
};

/**
 * Component for all projections.
 */
function Projection(_ref) {
  var data = _ref.data,
      _ref$projection = _ref.projection,
      projection = _ref$projection === void 0 ? 'mercator' : _ref$projection,
      projectionFunc = _ref.projectionFunc,
      clipAngle = _ref.clipAngle,
      clipExtent = _ref.clipExtent,
      scale = _ref.scale,
      translate = _ref.translate,
      center = _ref.center,
      rotate = _ref.rotate,
      precision = _ref.precision,
      fitExtent = _ref.fitExtent,
      fitSize = _ref.fitSize,
      centroid = _ref.centroid,
      graticule = _ref.graticule,
      graticuleLines = _ref.graticuleLines,
      graticuleOutline = _ref.graticuleOutline,
      className = _ref.className,
      innerRef = _ref.innerRef,
      pointRadius = _ref.pointRadius,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["data", "projection", "projectionFunc", "clipAngle", "clipExtent", "scale", "translate", "center", "rotate", "precision", "fitExtent", "fitSize", "centroid", "graticule", "graticuleLines", "graticuleOutline", "className", "innerRef", "pointRadius", "children"]);

  var maybeCustomProjection = typeof projection === 'string' ? projectionMapping[projection] : projection;
  var currProjection = maybeCustomProjection();
  if (clipAngle) currProjection.clipAngle(clipAngle);
  if (clipExtent) currProjection.clipExtent(clipExtent);
  if (scale) currProjection.scale(scale);
  if (translate) currProjection.translate(translate);
  if (center) currProjection.center(center);
  if (rotate) currProjection.rotate(rotate);
  if (precision) currProjection.precision(precision);
  if (fitExtent) currProjection.fitExtent.apply(currProjection, fitExtent);
  if (fitSize) currProjection.fitSize.apply(currProjection, fitSize);
  var path = (0, _d3Geo.geoPath)().projection(currProjection);
  if (pointRadius) path.pointRadius(pointRadius);
  var features = data.map(function (feature, i) {
    return {
      feature: feature,
      type: projection,
      projection: currProjection,
      index: i,
      centroid: path.centroid(feature),
      path: path(feature)
    };
  });
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path,
    features: features
  }));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: "visx-geo"
  }, graticule && !graticule.foreground && /*#__PURE__*/_react.default.createElement(_Graticule.default, _extends({
    graticule: function graticule(ml) {
      return path(ml) || '';
    }
  }, graticule)), graticuleLines && !graticuleLines.foreground && /*#__PURE__*/_react.default.createElement(_Graticule.default, _extends({
    lines: function lines(l) {
      return path(l) || '';
    }
  }, graticuleLines)), graticuleOutline && !graticuleOutline.foreground && /*#__PURE__*/_react.default.createElement(_Graticule.default, _extends({
    outline: function outline(p) {
      return path(p) || '';
    }
  }, graticuleOutline)), features.map(function (feature, i) {
    return /*#__PURE__*/_react.default.createElement("g", {
      key: projection + "-" + i
    }, /*#__PURE__*/_react.default.createElement("path", _extends({
      className: (0, _classnames.default)("visx-geo-" + projection, className),
      d: feature.path || '',
      ref: innerRef && innerRef(feature, i)
    }, restProps)), centroid && centroid(feature.centroid, feature));
  }), projectionFunc && projectionFunc(currProjection), graticule && graticule.foreground && /*#__PURE__*/_react.default.createElement(_Graticule.default, _extends({
    graticule: function graticule(ml) {
      return path(ml) || '';
    }
  }, graticule)), graticuleLines && graticuleLines.foreground && /*#__PURE__*/_react.default.createElement(_Graticule.default, _extends({
    lines: function lines(l) {
      return path(l) || '';
    }
  }, graticuleLines)), graticuleOutline && graticuleOutline.foreground && /*#__PURE__*/_react.default.createElement(_Graticule.default, _extends({
    outline: function outline(p) {
      return path(p) || '';
    }
  }, graticuleOutline)));
}

Projection.propTypes = {
  data: _propTypes.default.array.isRequired,
  projectionFunc: _propTypes.default.func,
  clipAngle: _propTypes.default.number,
  scale: _propTypes.default.number,
  precision: _propTypes.default.number,
  centroid: _propTypes.default.func,
  className: _propTypes.default.string,
  children: _propTypes.default.func,
  innerRef: _propTypes.default.func,
  pointRadius: _propTypes.default.number
};