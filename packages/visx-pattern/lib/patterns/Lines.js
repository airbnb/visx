"use strict";

exports.__esModule = true;
exports.pathForOrientation = pathForOrientation;
exports.default = Lines;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Pattern = _interopRequireDefault(require("./Pattern"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pathForOrientation(_ref) {
  var height = _ref.height,
      orientation = _ref.orientation;

  switch (orientation) {
    case _constants.PatternOrientation.horizontal:
      return "M 0," + height / 2 + " l " + height + ",0";

    case _constants.PatternOrientation.diagonal:
      return "M 0," + height + " l " + height + "," + -height + " M " + -height / 4 + "," + height / 4 + " l " + height / 2 + "," + -height / 2 + "\n             M " + 3 / 4 * height + "," + 5 / 4 * height + " l " + height / 2 + "," + -height / 2;

    case _constants.PatternOrientation.diagonalRightToLeft:
      return "M 0,0 l " + height + "," + height + "\n        M " + -height / 4 + "," + 3 / 4 * height + " l " + height / 2 + "," + height / 2 + "\n        M " + 3 / 4 * height + "," + -height / 4 + " l " + height / 2 + "," + height / 2;

    case _constants.PatternOrientation.vertical:
    default:
      return "M " + height / 2 + ", 0 l 0, " + height;
  }
}

function Lines(_ref2) {
  var id = _ref2.id,
      width = _ref2.width,
      height = _ref2.height,
      stroke = _ref2.stroke,
      strokeWidth = _ref2.strokeWidth,
      strokeDasharray = _ref2.strokeDasharray,
      _ref2$strokeLinecap = _ref2.strokeLinecap,
      strokeLinecap = _ref2$strokeLinecap === void 0 ? 'square' : _ref2$strokeLinecap,
      _ref2$shapeRendering = _ref2.shapeRendering,
      shapeRendering = _ref2$shapeRendering === void 0 ? 'auto' : _ref2$shapeRendering,
      _ref2$orientation = _ref2.orientation,
      orientation = _ref2$orientation === void 0 ? ['vertical'] : _ref2$orientation,
      background = _ref2.background,
      className = _ref2.className;
  var orientations = Array.isArray(orientation) ? orientation : [orientation];
  return /*#__PURE__*/_react.default.createElement(_Pattern.default, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/_react.default.createElement("rect", {
    className: (0, _classnames.default)('visx-pattern-line-background'),
    width: width,
    height: height,
    fill: background
  }), orientations.map(function (o, i) {
    return /*#__PURE__*/_react.default.createElement("path", {
      key: "visx-" + id + "-line-" + o + "-" + i,
      className: (0, _classnames.default)('visx-pattern-line', className),
      d: pathForOrientation({
        orientation: o,
        height: height
      }),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      strokeLinecap: strokeLinecap,
      shapeRendering: shapeRendering
    });
  }));
}

Lines.propTypes = {
  id: _propTypes.default.string.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  className: _propTypes.default.string,
  background: _propTypes.default.string,
  stroke: _propTypes.default.string,
  strokeWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  strokeDasharray: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  strokeLinecap: _propTypes.default.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  orientation: _propTypes.default.array
};