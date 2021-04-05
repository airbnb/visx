import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { geoOrthographic, geoAlbers, geoAlbersUsa, geoMercator, geoNaturalEarth1, geoEqualEarth, geoPath } from 'd3-geo'; // this is just for types
// eslint-disable-next-line import/no-unresolved

import Graticule from '../graticule/Graticule';
var projectionMapping = {
  orthographic: function orthographic() {
    return geoOrthographic();
  },
  albers: function albers() {
    return geoAlbers();
  },
  albersUsa: function albersUsa() {
    return geoAlbersUsa();
  },
  mercator: function mercator() {
    return geoMercator();
  },
  naturalEarth: function naturalEarth() {
    return geoNaturalEarth1();
  },
  equalEarth: function equalEarth() {
    return geoEqualEarth();
  }
};

/**
 * Component for all projections.
 */
export default function Projection(_ref) {
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
  var path = geoPath().projection(currProjection);
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
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path,
    features: features
  }));
  return /*#__PURE__*/React.createElement(Group, {
    className: "visx-geo"
  }, graticule && !graticule.foreground && /*#__PURE__*/React.createElement(Graticule, _extends({
    graticule: function graticule(ml) {
      return path(ml) || '';
    }
  }, graticule)), graticuleLines && !graticuleLines.foreground && /*#__PURE__*/React.createElement(Graticule, _extends({
    lines: function lines(l) {
      return path(l) || '';
    }
  }, graticuleLines)), graticuleOutline && !graticuleOutline.foreground && /*#__PURE__*/React.createElement(Graticule, _extends({
    outline: function outline(p) {
      return path(p) || '';
    }
  }, graticuleOutline)), features.map(function (feature, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: projection + "-" + i
    }, /*#__PURE__*/React.createElement("path", _extends({
      className: cx("visx-geo-" + projection, className),
      d: feature.path || '',
      ref: innerRef && innerRef(feature, i)
    }, restProps)), centroid && centroid(feature.centroid, feature));
  }), projectionFunc && projectionFunc(currProjection), graticule && graticule.foreground && /*#__PURE__*/React.createElement(Graticule, _extends({
    graticule: function graticule(ml) {
      return path(ml) || '';
    }
  }, graticule)), graticuleLines && graticuleLines.foreground && /*#__PURE__*/React.createElement(Graticule, _extends({
    lines: function lines(l) {
      return path(l) || '';
    }
  }, graticuleLines)), graticuleOutline && graticuleOutline.foreground && /*#__PURE__*/React.createElement(Graticule, _extends({
    outline: function outline(p) {
      return path(p) || '';
    }
  }, graticuleOutline)));
}
Projection.propTypes = {
  data: _pt.array.isRequired,
  projectionFunc: _pt.func,
  clipAngle: _pt.number,
  scale: _pt.number,
  precision: _pt.number,
  centroid: _pt.func,
  className: _pt.string,
  children: _pt.func,
  innerRef: _pt.func,
  pointRadius: _pt.number
};