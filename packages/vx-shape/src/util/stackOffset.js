import {
  stackOffsetExpand,
  stackOffsetDiverging,
  stackOffsetNone,
  stackOffsetSilhouette,
  stackOffsetWiggle,
} from 'd3-shape';

export const STACK_OFFSETS = {
  expand: stackOffsetExpand,
  diverging: stackOffsetDiverging,
  none: stackOffsetNone,
  silhouette: stackOffsetSilhouette,
  wiggle: stackOffsetWiggle,
};

export const STACK_OFFSET_NAMES = Object.keys(STACK_OFFSETS);

export default function stackOffset(offset) {
  return STACK_OFFSETS[offset] || STACK_OFFSETS.none;
}
