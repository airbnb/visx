export interface MarginShape {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface WidthAndHeight {
  width: number;
  height: number;
}

export type ShowProvidedProps = {
  width: number;
  height: number;
  margin?: MarginShape;
  events?: boolean;
};

export type VxPackage =
  | 'annotation'
  | 'axis'
  | 'curve'
  | 'glyph'
  | 'grid'
  | 'legend'
  | 'marker'
  | 'scale'
  | 'shape'
  | 'threshold'
  | 'tooltip'
  | 'chord'
  | 'geo'
  | 'heatmap'
  | 'hierarchy'
  | 'network'
  | 'stats'
  | 'brush'
  | 'drag'
  | 'voronoi'
  | 'zoom'
  | 'clip-path'
  | 'group'
  | 'gradient'
  | 'pattern'
  | 'text'
  | 'bounds'
  | 'mock-data'
  | 'responsive'
  | 'point';

/** DocGenInfo for a single prop */
export type PropInfo = {
  defaultValue?: { value?: unknown };
  description?: string;
  name: string;
  required: boolean;
  type?: { name: string };
};

/** DocGenInfo, added to components by react-docgen-typescript-loader */
export type DocGenInfo = {
  description?: string;
  displayName?: string;
  props: { [propName: string]: PropInfo };
};
