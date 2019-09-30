import React from 'react';
import PropTypes from 'prop-types';
import { chord as d3chord } from 'd3-chord';

Chord.propTypes = {
  matrix: PropTypes.array.isRequired,
  padAngle: PropTypes.number,
  sortGroups: PropTypes.func,
  sortSubgroups: PropTypes.func,
  sortChords: PropTypes.func,
  children: PropTypes.func.isRequired,
};

export default function Chord({
  matrix,
  padAngle,
  sortGroups,
  sortSubgroups,
  sortChords,
  children,
}) {
  const chord = d3chord();
  if (padAngle) chord.padAngle(padAngle);
  if (sortGroups) chord.sortGroups(sortGroups);
  if (sortSubgroups) chord.sortSubgroups(sortSubgroups);
  if (sortChords) chord.sortChords(sortChords);
  const chords = chord(matrix);
  if (children) return children({ chords });

  // so react-docgen picks it up
  return <g />;
}
