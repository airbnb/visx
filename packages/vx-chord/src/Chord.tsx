import React from 'react';
import { chord as d3chord, Chords } from 'd3-chord';

type DefaultSortComporator = (a: number, b: number) => number;

export type ChordProps = {
  matrix: number[][];
  padAngle?: number;
  sortGroups?: DefaultSortComporator | null;
  sortSubgroups?: DefaultSortComporator | null;
  sortChords?: DefaultSortComporator | null;
  children: (chords: { chords: Chords }) => React.ReactNode;
};

export default function Chord({
  matrix,
  padAngle,
  sortGroups,
  sortSubgroups,
  sortChords,
  children,
}: ChordProps) {
  const chord = d3chord();
  if (padAngle) chord.padAngle(padAngle);
  if (sortGroups) chord.sortGroups(sortGroups);
  if (sortSubgroups) chord.sortSubgroups(sortSubgroups);
  if (sortChords) chord.sortChords(sortChords);
  const chords = chord(matrix);
  // using array here, to prevent uniq keys warning from the react
  if (children)
    return <React.Fragment key="chord-child-wrapper">{children({ chords })}</React.Fragment>;

  // so react-docgen picks it up
  return <g />;
}
