import { ReactNode } from 'react';

import Platform from './modules/Platform';

type Primitives = {
  Svg: null | ReactNode | string;
  Circle: null | ReactNode | string;
  ClipPath: null | ReactNode | string;
  Defs: null | ReactNode | string;
  Ellipse: null | ReactNode | string;
  G: null | ReactNode | string;
  Image: null | ReactNode | string;
  Line: null | ReactNode | string;
  LinearGradient: null | ReactNode | string;
  Path: null | ReactNode | string;
  Pattern: null | ReactNode | string;
  Polygon: null | ReactNode | string;
  Polyline: null | ReactNode | string;
  RadialGradient: null | ReactNode | string;
  Rect: null | ReactNode | string;
  Stop: null | ReactNode | string;
  Symbol: null | ReactNode | string;
  Text: null | ReactNode | string;
  TextPath: null | ReactNode | string;
  TSpan: null | ReactNode | string;
  Use: null | ReactNode | string;
  Platform: {
    OS: string;
    Version: number;
  } & {
    select?: ((_: any) => void) | undefined;
    inject?: ((_: { OS: string; Version: number }) => void) | undefined;
  };
  inject: (
    api: {
      [key: string]: any;
    } & {
      Platform: {
        OS: string;
        Version: number;
      };
    },
  ) => void;
};

type SvgElement =
  | 'Svg'
  | 'Circle'
  | 'Ellipse'
  | 'G'
  | 'LinearGradient'
  | 'RadialGradient'
  | 'Line'
  | 'Path'
  | 'Polygon'
  | 'Polyline'
  | 'Rect'
  | 'Symbol'
  | 'Text'
  | 'Use'
  | 'Defs'
  | 'Stop';

const VxPrimitives: Primitives = {
  /* Svg primitives: */
  Svg: null,

  Circle: null,
  ClipPath: null,
  Defs: null,
  Ellipse: null,
  G: null,
  Image: null,
  Line: null,
  LinearGradient: null,
  Path: null,
  Pattern: null,
  Polygon: null,
  Polyline: null,
  RadialGradient: null,
  Rect: null,
  Stop: null,
  Symbol: null,
  Text: null,
  TextPath: null,
  TSpan: null,
  Use: null,

  // Touchable: null,
  // View: null,
  // Text: null,
  // Dimensions: null,
  // PixelRatio: require('./modules/PixelRatio'),
  Platform,
  inject: (api: { [key: string]: any } & { Platform: { OS: string; Version: number } }) => {
    [
      'Svg',
      'Circle',
      'Ellipse',
      'G',
      'LinearGradient',
      'RadialGradient',
      'Line',
      'Path',
      'Polygon',
      'Polyline',
      'Rect',
      'Symbol',
      'Text',
      'Use',
      'Defs',
      'Stop',
      // @ts-ignore
    ].forEach((k: SvgElement) => {
      if (api[k]) {
        VxPrimitives[k] = api[k];
      }
    });
    if (api.Platform) {
      // @ts-ignore
      VxPrimitives['Platform'].inject(api.Platform);
    }
  },
};

export default VxPrimitives;
