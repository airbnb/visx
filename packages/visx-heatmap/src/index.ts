// @visx/heatmap
export { default as HeatmapCircle } from './heatmaps/HeatmapCircle';
export { default as HeatmapRect } from './heatmaps/HeatmapRect';

export type * from './types';
export type { CircleCell, HeatmapCircleProps } from './heatmaps/HeatmapCircle';
export type {
  ComponentProps as HeatmapRectComponentProps,
  HeatmapRectProps,
  RectCell,
} from './heatmaps/HeatmapRect';
