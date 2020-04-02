import { Svg } from 'react-sketchapp';

const {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image,
  Line,
  LinearGradient,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Symbol,
  Text,
  TextPath,
  TSpan,
  Use,
} = Svg;

import VxPrimitives from './VxPrimitives';

VxPrimitives.inject({
  Svg,
  Circle,
  ClipPath,
  Ellipse,
  G,
  Image,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Pattern,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  TextPath,
  TSpan,
  Use,
  Defs,
  Stop,
  Platform: {
    OS: 'sketch',
    Version: 1,
  },
});

module.exports = VxPrimitives;
