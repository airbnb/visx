// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
import { chord as d3chord } from 'd3-chord';

type Props = {
  matrix: any[];
  padAngle?: number;
  sortGroups?: (...args: any[]) => any;
  sortSubgroups?: (...args: any[]) => any;
  sortChords?: (...args: any[]) => any;
  children: (...args: any[]) => any;
};

export default function Chord({
  matrix,
  padAngle,
  sortGroups,
  sortSubgroups,
  sortChords,
  children,
}: Props) {
  const chord = d3chord();
  if (padAngle) chord.padAngle(padAngle);
  if (sortGroups) chord.sortGroups(sortGroups);
  if (sortSubgroups) chord.sortSubgroups(sortSubgroups);
  if (sortChords) chord.sortChords(sortChords);
  const chords = chord(matrix);
  if (children) return children({ chords });

  // so react-docgen picks it up
  // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <g />;
}
