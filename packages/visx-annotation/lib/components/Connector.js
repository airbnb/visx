"use strict";

exports.__esModule = true;
exports.default = Connector;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _AnnotationContext = _interopRequireDefault(require("../context/AnnotationContext"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Connector(_ref) {
  var _annotationContext$x, _annotationContext$y, _annotationContext$dx, _annotationContext$dy;
  var className = _ref.className,
    propsX = _ref.x,
    propsY = _ref.y,
    propsDx = _ref.dx,
    propsDy = _ref.dy,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'elbow' : _ref$type,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#222' : _ref$stroke,
    pathProps = _ref.pathProps;
  // if props are provided, they take precedence over context
  var annotationContext = (0, _react.useContext)(_AnnotationContext.default);
  var x0 = propsX == null ? (_annotationContext$x = annotationContext.x) != null ? _annotationContext$x : 0 : propsX;
  var y0 = propsY == null ? (_annotationContext$y = annotationContext.y) != null ? _annotationContext$y : 0 : propsY;
  var dx = propsDx == null ? (_annotationContext$dx = annotationContext.dx) != null ? _annotationContext$dx : 0 : propsDx;
  var dy = propsDy == null ? (_annotationContext$dy = annotationContext.dy) != null ? _annotationContext$dy : 0 : propsDy;
  var x1 = x0; // only used with elbow type
  var y1 = y0;
  var x2 = x0 + dx;
  var y2 = y0 + dy;
  if (type === 'elbow') {
    // if dx < dy, find the intesection of y=x or y=-x from subject, with vertical line to label
    if (Math.abs(dx) <= Math.abs(dy)) {
      // target line is vertical x = x2
      x1 = x2;
      // intersection with y=x line (if dy > 0) or y=x (if dy < 0)
      var sign = dy > 0 ? 1 : -1;
      y1 = y0 + sign * Math.abs(x1 - x0);
    }
    // if dx > dy, find the intesection of y=x or y=-x from subject, with horizontal line to label
    else {
      // target line is horizontal y = y2
      y1 = y2;
      // find intersection with y=-x line (if dx > 0) or y=x (if dx < 0)
      var _sign = dx > 0 ? 1 : -1;
      x1 = x0 + _sign * Math.abs(y1 - y0);
    }
  }
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    className: (0, _classnames.default)('visx-annotation-connector', className),
    strokeWidth: 1,
    stroke: stroke,
    fill: "transparent",
    pointerEvents: "none",
    d: "M" + x0 + "," + y0 + (type === 'elbow' ? "L" + x1 + "," + y1 : '') + "L" + x2 + "," + y2
  }, pathProps));
}
Connector.propTypes = {
  className: _propTypes.default.string,
  type: _propTypes.default.oneOf(['line', 'elbow']),
  stroke: _propTypes.default.string
};