import type { ReactNode } from 'react';
import type { Chords } from 'd3-chord';
import { chord as d3chord } from 'd3-chord';

type DefaultSortComporator = (a: number, b: number) => number;

export type ChordProps = {
  /** Square data matrix of size n×n, where the matrix represents the directed flow amongst a network (a complete digraph) of `n` nodes. The given matrix must be an array of length `n`, where each element `matrix[i]` is an array of `n` numbers, where each `matrix[i][j]` represents the flow from the `ith` node in the network to the `jth` node. Each number `matrix[i][j]` must be nonnegative, though it can be zero if there is no flow from node `i` to node `j`. */
  matrix: number[][];
  /** Sets the pad angle between adjacent groups to the specified number in radians. */
  padAngle?: number;
  /** Comparator used to sort the groups by their total outflow. */
  sortGroups?: DefaultSortComporator | null;
  /** Comparator used to sort the subgroups corresponding to `matrix[i][0 … n - 1]` for a given group i by their total outflow. */
  sortSubgroups?: DefaultSortComporator | null;
  /** Comparator used to sort the chords by their combined flow; this only affects the `z-order` of the chords. */
  sortChords?: DefaultSortComporator | null;
  /** Child render function, passed the configured chords. */
  children: (chords: { chords: Chords }) => ReactNode;
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
  if (children) return <>{children({ chords })}</>;

  // so react-docgen picks it up
  return <g />;
}
