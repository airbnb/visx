"use strict";

exports.__esModule = true;
exports.default = Chord;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _d3Chord = require("d3-chord");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Chord(_ref) {
  var matrix = _ref.matrix,
      padAngle = _ref.padAngle,
      sortGroups = _ref.sortGroups,
      sortSubgroups = _ref.sortSubgroups,
      sortChords = _ref.sortChords,
      children = _ref.children;
  var chord = (0, _d3Chord.chord)();
  if (padAngle) chord.padAngle(padAngle);
  if (sortGroups) chord.sortGroups(sortGroups);
  if (sortSubgroups) chord.sortSubgroups(sortSubgroups);
  if (sortChords) chord.sortChords(sortChords);
  var chords = chord(matrix);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    chords: chords
  })); // so react-docgen picks it up

  return /*#__PURE__*/_react.default.createElement("g", null);
}

Chord.propTypes = {
  matrix: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.number)).isRequired,
  padAngle: _propTypes.default.number,
  sortGroups: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.oneOf([null])]),
  sortSubgroups: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.oneOf([null])]),
  sortChords: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.oneOf([null])]),
  children: _propTypes.default.func.isRequired
};