import { PointerEvent, FocusEvent } from 'react';
import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';
import { Series, SeriesPoint } from 'd3-shape';

/** Call signature of PointerEvent callback. */
export type EventHandlerParams<Datum> = {
  /** Series key that datum belongs to. */
  key: string;
  /** Index of datum in series data array. */
  index: number;
  /** Datum. */
  datum: Datum;
  /** Optional distance of datum x value to event x value. Used to determine closest datum. */
  distanceX?: number;
  /** Optional distance of datum y value to event y value. Used to determine closest datum. */
  distanceY?: number;
  /** Coordinates of the event in svg space. */
  svgPoint?: { x: number; y: number };
  /** The PointerEvent or FocusEvent. */
  event?: PointerEvent | FocusEvent;
};

export type SeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = {
  /** Required data key for the Series, should be unique across all series. */
  dataKey: string;
  /** Data for the Series. */
  data: Datum[];
  /** Given a Datum, returns the x-scale value. */
  xAccessor: (d: Datum) => ScaleInput<XScale>;
  /** Given a Datum, returns the y-scale value. */
  yAccessor: (d: Datum) => ScaleInput<YScale>;
  /**
   * Callback invoked for onPointerMove events for the nearest Datum to the PointerEvent.
   * By default XYChart will capture and emit PointerEvents, invoking this function for
   * any Series with a defined handler. Alternatively you may set <XYChart captureEvents={false} />
   * and Series will emit their own events.
   */
  onPointerMove?: ({
    datum,
    distanceX,
    distanceY,
    event,
    index,
    key,
    svgPoint,
  }: EventHandlerParams<Datum>) => void;
  /**
   * Callback invoked for onPointerOut events. By default XYChart will capture and emit
   * PointerEvents, invoking this function for any Series with a defined handler.
   * Alternatively you may set <XYChart captureEvents={false} /> and Series will emit
   * their own events.
   */
  onPointerOut?: (
    /** The PointerEvent. */
    event: React.PointerEvent,
  ) => void;
  /**
   * Callback invoked for onPointerUp events for the nearest Datum to the PointerEvent.
   * By default XYChart will capture and emit PointerEvents, invoking this function for
   * any Series with a defined handler. Alternatively you may set <XYChart captureEvents={false} />
   * and Series will emit their own events.
   */
  onPointerUp?: ({
    datum,
    distanceX,
    distanceY,
    event,
    index,
    key,
    svgPoint,
  }: EventHandlerParams<Datum>) => void;
  /**
   * Callback invoked for onFocus events for the nearest Datum to the FocusEvent.
   * XYChart will NOT capture and emit FocusEvents, they are emitted from individual Series glyph shapes.
   */
  onFocus?: ({
    datum,
    distanceX,
    distanceY,
    event,
    index,
    key,
    svgPoint,
  }: EventHandlerParams<Datum>) => void;
  /**
   * Callback invoked for onBlur events for the nearest Datum to the FocusEvent.
   * XYChart will NOT capture and emit FocusEvents, they are emitted from individual Series glyph shapes.
   */
  onBlur?: (
    /** The FocusEvent. */
    event: React.FocusEvent,
  ) => void;
  /** Whether the Series emits and subscribes to PointerEvents and FocusEvents (including Tooltip triggering). */
  enableEvents?: boolean;
};

/** Bar shape. */
export type Bar = {
  /** Unique key for Bar (not dataKey). */
  key: string;
  /** X coordinate of Bar. */
  x: number;
  /** Y coordinate of Bar. */
  y: number;
  /** Width coordinate of Bar. */
  width: number;
  /** Height coordinate of Bar. */
  height: number;
  /** Fill color of Bar */
  fill?: string;
};

/** Props for base Bars components */
export type BarsProps<XScale extends AxisScale, YScale extends AxisScale> = {
  bars: Bar[];
  xScale: XScale;
  yScale: YScale;
  horizontal?: boolean;
} & Omit<React.SVGProps<SVGRectElement>, 'x' | 'y' | 'width' | 'height' | 'ref'>;

// BarStack transforms its child series Datum into CombinedData<XScale, YScale>
export type BarStackDatum<XScale extends AxisScale, YScale extends AxisScale> = SeriesPoint<
  CombinedStackData<XScale, YScale>
>;

export type BarStackData<XScale extends AxisScale, YScale extends AxisScale> = Series<
  CombinedStackData<XScale, YScale>,
  string
>[];

export type CombinedStackData<XScale extends AxisScale, YScale extends AxisScale> = {
  [dataKey: string]: ScaleInput<XScale> | ScaleInput<YScale>;
} & { stack: ScaleInput<XScale> | ScaleInput<YScale>; positiveSum: number; negativeSum: number };

/** Glyphs */
export type GlyphsProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = {
  xScale: XScale;
  yScale: YScale;
  horizontal?: boolean;
  glyphs: GlyphProps<Datum>[];
  /** Callback to invoke for onBlur. */
  onBlur?: (event: FocusEvent) => void;
  /** Callback to invoke for onFocus. */
  onFocus?: (event: FocusEvent) => void;
  /** Callback to invoke for onPointerMove. */
  onPointerMove?: (event: PointerEvent) => void;
  /** Callback to invoke for onPointerOut. */
  onPointerOut?: (event: PointerEvent) => void;
  /** Callback to invoke for onPointerUp. */
  onPointerUp?: (event: PointerEvent) => void;
};

export type GlyphProps<Datum extends object> = {
  /** Unique key for Glyph (not dataKey). */
  key: string;
  /** Datum for Glyph. */
  datum: Datum;
  /** Index of Datum in data array. */
  index: number;
  /** X coordinate of Glyph. */
  x: number;
  /** Y coordinate of Glyph. */
  y: number;
  /** Size of Glyph. */
  size: number;
  /** Color of Glyph. */
  color: string;
  /** Callback to invoke for onBlur. */
  onBlur?: (event: FocusEvent) => void;
  /** Callback to invoke for onFocus. */
  onFocus?: (event: FocusEvent) => void;
  /** Callback to invoke for onPointerMove. */
  onPointerMove?: (event: PointerEvent) => void;
  /** Callback to invoke for onPointerOut. */
  onPointerOut?: (event: PointerEvent) => void;
  /** Callback to invoke for onPointerUp. */
  onPointerUp?: (event: PointerEvent) => void;
};
