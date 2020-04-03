// @ts-ignore
declare module '@vx/primitives' {
  import { FunctionComponent, ReactNode, ComponentClass } from 'react';
  import {
    CommonPathProps,
    ImageProps,
    LineProps,
    LinearGradientProps,
    PathProps,
    PatternProps,
    EllipseProps,
    DefinitionProps,
    SvgProps,
    PolygonProps,
    PolylineProps,
    RadialGradientProps,
    RectProps,
    StopProps,
    SymbolProps,
    TextProps,
    TextPathProps,
    TSpanProps,
    UseProps,
    GProps,
  } from 'react-native-svg';

  // type BaseSvgElement = FunctionComponent<{ className?: string | undefined, children?: ReactNode }>
  type BaseProps = { className?: string; ref?: any };

  export const Defs: ComponentClass<BaseProps & DefinitionProps>;
  export const Ellipse: ComponentClass<BaseProps & EllipseProps>;
  export const G: ComponentClass<BaseProps & GProps>;
  export const Image: ComponentClass<BaseProps & ImageProps>;
  export const Line: ComponentClass<BaseProps & LineProps>;
  export const LinearGradient: ComponentClass<BaseProps & LinearGradientProps>;
  export const Path: ComponentClass<BaseProps & PathProps>;
  export const Pattern: ComponentClass<BaseProps & PatternProps>;
  export const Polygon: ComponentClass<BaseProps & PolygonProps>;
  export const Polyline: ComponentClass<BaseProps & PolylineProps>;
  export const RadialGradient: ComponentClass<BaseProps & RadialGradientProps>;
  export const Rect: ComponentClass<BaseProps & RectProps>;
  export const Stop: ComponentClass<BaseProps & StopProps>;
  export const Symbol: ComponentClass<BaseProps & SymbolProps>;
  export const Text: ComponentClass<BaseProps & TextProps>;
  export const TextPath: ComponentClass<BaseProps & TextPathProps>;
  export const TSpan: ComponentClass<BaseProps & TSpanProps>;
  export const Use: ComponentClass<BaseProps & UseProps>;

  export const Platform: {
    OS: string;
    Version: number;
  } & {
    select?: ((_: any) => void) | undefined;
    inject?: ((_: { OS: string; Version: number }) => void) | undefined;
  };

  export const inject: (
    api: {
      [key: string]: any;
    } & {
      Platform: {
        OS: string;
        Version: number;
      };
    },
  ) => void;
}

const _core = require('./core');

module.exports = _core;
