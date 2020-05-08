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
