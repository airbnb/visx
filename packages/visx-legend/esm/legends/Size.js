import _pt from "prop-types";
var _excluded = ["scale", "domain", "steps", "labelFormat", "labelTransform"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import Legend from './Legend';
import labelTransformFactory from '../util/labelTransformFactory';
import defaultDomain from '../util/defaultDomain';
import identity from '../util/identity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export default function Size(_ref) {
  var scale = _ref.scale,
    inputDomain = _ref.domain,
    _ref$steps = _ref.steps,
    steps = _ref$steps === void 0 ? 5 : _ref$steps,
    _ref$labelFormat = _ref.labelFormat,
    labelFormat = _ref$labelFormat === void 0 ? identity : _ref$labelFormat,
    _ref$labelTransform = _ref.labelTransform,
    labelTransform = _ref$labelTransform === void 0 ? labelTransformFactory : _ref$labelTransform,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var domain = inputDomain || defaultDomain({
    steps: steps,
    scale: scale
  });
  return /*#__PURE__*/React.createElement(Legend, _extends({
    scale: scale,
    domain: domain,
    labelFormat: labelFormat,
    labelTransform: labelTransform
  }, restProps));
}
Size.propTypes = {
  steps: _pt.number
};