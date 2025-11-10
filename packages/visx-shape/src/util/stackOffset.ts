import {
  stackOffsetExpand,
  stackOffsetDiverging,
  stackOffsetNone,
  stackOffsetSilhouette,
  stackOffsetWiggle,
} from '@visx/vendor/d3-shape';

export const STACK_OFFSETS = {
  expand: stackOffsetExpand,
  diverging: stackOffsetDiverging,
  none: stackOffsetNone,
  silhouette: stackOffsetSilhouette,
  wiggle: stackOffsetWiggle,
} as const;

export type StackOffset = keyof typeof STACK_OFFSETS;

export const STACK_OFFSET_NAMES = Object.keys(STACK_OFFSETS) as StackOffset[];

export default function stackOffset(offset?: keyof typeof STACK_OFFSETS) {
  return (offset && STACK_OFFSETS[offset]) || STACK_OFFSETS.none;
}
