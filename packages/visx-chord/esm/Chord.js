import _pt from "prop-types";
import React from 'react';
import { chord as d3chord } from 'd3-chord';
export default function Chord(_ref) {
  var matrix = _ref.matrix,
      padAngle = _ref.padAngle,
      sortGroups = _ref.sortGroups,
      sortSubgroups = _ref.sortSubgroups,
      sortChords = _ref.sortChords,
      children = _ref.children;
  var chord = d3chord();
  if (padAngle) chord.padAngle(padAngle);
  if (sortGroups) chord.sortGroups(sortGroups);
  if (sortSubgroups) chord.sortSubgroups(sortSubgroups);
  if (sortChords) chord.sortChords(sortChords);
  var chords = chord(matrix);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    chords: chords
  })); // so react-docgen picks it up

  return /*#__PURE__*/React.createElement("g", null);
}
Chord.propTypes = {
  matrix: _pt.arrayOf(_pt.arrayOf(_pt.number)).isRequired,
  padAngle: _pt.number,
  sortGroups: _pt.oneOfType([_pt.func, _pt.oneOf([null])]),
  sortSubgroups: _pt.oneOfType([_pt.func, _pt.oneOf([null])]),
  sortChords: _pt.oneOfType([_pt.func, _pt.oneOf([null])]),
  children: _pt.func.isRequired
};