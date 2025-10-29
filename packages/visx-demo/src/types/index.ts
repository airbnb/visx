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

export type VisxPackage =
  | 'annotation'
  | 'axis'
  | 'bounds'
  | 'brush'
  | 'chord'
  | 'clip-path'
  | 'curve'
  | 'delaunay'
  | 'drag'
  | 'event'
  | 'geo'
  | 'glyph'
  | 'gradient'
  | 'grid'
  | 'group'
  | 'heatmap'
  | 'hierarchy'
  | 'legend'
  | 'marker'
  | 'mock-data'
  | 'network'
  | 'pattern'
  | 'point'
  | 'react-spring'
  | 'responsive'
  | 'sankey'
  | 'scale'
  | 'shape'
  | 'stats'
  | 'text'
  | 'threshold'
  | 'tooltip'
  | 'voronoi'
  | 'visx'
  | 'wordcloud'
  | 'xychart'
  | 'zoom';

export type PackageJson = { dependencies?: { [packageName: string]: string } };

/** DocGenInfo for a single prop */
export type PropInfo = {
  defaultValue?: { value?: unknown };
  description?: string;
  name: string;
  required: boolean;
  type?: { name: string };
};

/** ParamInfo for function parameters */
export type ParamInfo = {
  name: string;
  description?: string;
  type?: { name: string };
  defaultValue?: { value?: unknown };
};

/** DocGenInfo, added to components by react-docgen-typescript-loader or our custom generator */
export type DocGenInfo = {
  description?: string;
  displayName?: string;
  // For components/hooks - their props/return values
  props: { [propName: string]: PropInfo };
  // For utility functions - their parameters and return type
  kind?: 'component' | 'hook' | 'function';
  parameters?: ParamInfo[];
  returnType?: string;
  // Source file information for "View Source" links
  filePath?: string;
  lineNumber?: number;
};
