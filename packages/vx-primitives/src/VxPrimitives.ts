import { ReactNode } from 'react';

import Platform from './modules/Platform';

type Primitives = {
  Svg?: ReactNode | string;

  Circle?: ReactNode | string;
  ClipPath?: ReactNode | string;
  Defs?: ReactNode | string;
  Ellipse?: ReactNode | string;
  G?: ReactNode | string;
  Image?: ReactNode | string;
  Line?: ReactNode | string;
  LinearGradient?: ReactNode | string;
  Path?: ReactNode | string;
  Pattern?: ReactNode | string;
  Polygon?: ReactNode | string;
  Polyline?: ReactNode | string;
  RadialGradient?: ReactNode | string;
  Rect?: ReactNode | string;
  Stop?: ReactNode | string;
  Symbol?: ReactNode | string;
  Text?: ReactNode | string;
  TextPath?: ReactNode | string;
  TSpan?: ReactNode | string;
  Use?: ReactNode | string;
  Platform: typeof Platform;
};

const VxPrimitives: Primitives & { inject: (elements: Primitives) => void } = {
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
  inject: api => {
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
    ].forEach(k => {
      if (api[k]) {
        VxPrimitives[k] = api[k];
      }
    });

    if (api.Platform) {
      VxPrimitives['Platform'].inject(api.Platform);
    }
  },
};

export default VxPrimitives;
