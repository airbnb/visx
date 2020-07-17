export type ScaleInterpolate =
  | 'rgb'
  | 'lab'
  | 'hcl'
  | 'hsl'
  | 'hsl-long'
  | 'hcl-long'
  | 'cubehelix'
  | 'cubehelix-long';

export interface ScaleInterpolateParams {
  type: 'rgb' | 'cubehelix' | 'cubehelix-long';
  gamma?: number;
}
