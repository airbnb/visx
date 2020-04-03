import 'react-dom';

import VxPrimitives from './VxPrimitives';

VxPrimitives.inject({
  Svg: 'svg',
  Circle: 'circle',
  ClipPath: 'clipPath',
  Ellipse: 'ellipse',
  G: 'g',
  Image: 'image',
  LinearGradient: 'linearGradient',
  RadialGradient: 'radialGradient',
  Line: 'line',
  Path: 'path',
  Pattern: 'pattern',
  Polygon: 'polygon',
  Polyline: 'polyline',
  Rect: 'rect',
  Symbol: 'symbol',
  Text: 'text',
  TextPath: 'textPath',
  TSpan: 'tspan',
  Use: 'use',
  Defs: 'defs',
  Stop: 'stop',
  Platform: {
    OS: 'web',
    Version: 1,
  },
});

module.exports = VxPrimitives;
