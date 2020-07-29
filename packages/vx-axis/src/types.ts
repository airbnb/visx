import { PickD3Scale, ScaleType } from '@vx/scale';
import { TextProps } from '@vx/text/lib/Text';

export type AxisOrientation = 'top' | 'right' | 'bottom' | 'left';

export type FormattedValue = string | number | undefined;

export type TickFormatter<Datum> = (value: Datum, tickIndex: number) => FormattedValue;

export type TickLabelProps<Datum> = (val: Datum, index: number) => Partial<TextProps>;

export type TickRendererProps = Partial<TextProps> & {
  x: number;
  y: number;
  formattedValue: FormattedValue;
};

// In order to plot values on an axis, Output must be numeric or coercible to a number.
// Some scales return undefined.
export type ScaleOutput = number | { valueOf(): number } | undefined;

export interface Point {
  x: number;
  y: number;
}

interface CommonProps<Datum> {
  /** The class name applied to the axis line element. */
  axisLineClassName?: string;
  /**  If true, will hide the axis line. */
  hideAxisLine: boolean;
  /** If true, will hide the ticks (but not the tick labels). */
  hideTicks: boolean;
  /** If true, will hide the '0' value tick and tick label. */
  hideZero: boolean;
  /** The text for the axis label. */
  label?: string;
  /** The class name applied to the axis label text element. */
  labelClassName?: string;
  /** Pixel offset of the axis label (does not include tick label font size, which is accounted for automatically)  */
  labelOffset?: number;
  /** Props applied to the axis label component. */
  labelProps?: Partial<TextProps>;
  /** The number of ticks wanted for the axis (note this is approximate)  */
  numTicks: number;
  /** Placement of the axis */
  orientation: AxisOrientation;
  /** Pixel padding to apply to both sides of the axis. */
  rangePadding: number;
  /** The color for the stroke of the lines. */
  stroke?: string;
  /** The pixel value for the width of the lines. */
  strokeWidth?: number;
  /** The pattern of dashes in the stroke. */
  strokeDasharray?: string;
  /** The class name applied to each tick group. */
  tickClassName?: string;
  /** Override the component used to render tick labels (instead of <Text /> from @vx/text) */
  tickComponent?: (tickRendererProps: TickRendererProps) => React.ReactNode;
  /** A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. */
  tickFormat: TickFormatter<Datum>;
  /** A function that returns props for a given tick label. */
  tickLabelProps?: TickLabelProps<Datum>;
  /** The length of the tick lines. */
  tickLength: number;
  /** The color for the tick's stroke value. */
  tickStroke?: string;
  /** A custom SVG transform value to be applied to each tick group. */
  tickTransform?: string;
}

export type ChildRenderProps<Datum> = CommonProps<Datum> & {
  axisFromPoint: Point;
  axisToPoint: Point;
  horizontal: boolean;
  /** A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function. */
  scale: PickD3Scale<ScaleType, ScaleOutput>;
  tickPosition: (value: Datum) => ScaleOutput;
  /** Axis coordinate sign, -1 for left or top orientation. */
  tickSign: 1 | -1;
  ticks: {
    value: Datum;
    index: number;
    from: Point;
    to: Point;
    formattedValue: FormattedValue;
  }[];
};

export type SharedAxisProps<Datum> = Partial<CommonProps<Datum>> & {
  /** The class name applied to the outermost axis group element. */
  axisClassName?: string;
  /** A left pixel offset applied to the entire axis. */
  left?: number;
  /** A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function. */
  scale: PickD3Scale<ScaleType, ScaleOutput>;
  /** An array of values that determine the number and values of the ticks. Falls back to `scale.ticks()` or `.domain()`. */
  tickValues?: Datum[];
  /** A top pixel offset applied to the entire axis. */
  top?: number;
  /** For more control over rendering or to add event handlers to datum, pass a function as children. */
  children?: (renderProps: ChildRenderProps<Datum>) => React.ReactNode;
};

// export type GenericScale<ScaleInput> =
//   | ScaleNoRangeRound<ScaleInput>
//   | ScaleWithRangeRound<ScaleInput>;

// interface ScaleNoRangeRound<ScaleInput> {
//   (value: ScaleInput): ScaleOutput | [ScaleOutput, ScaleOutput]; // quantize scales return an array
//   domain(): ScaleInput[] | [ScaleInput, ScaleInput];
//   domain(scaleInput: ScaleInput[] | [ScaleInput, ScaleInput]): unknown; // we can't capture the copy of the type accurately
//   range(): ScaleOutput[] | [ScaleOutput, ScaleOutput];
//   range(scaleOutput: ScaleOutput[] | [ScaleOutput, ScaleOutput]): unknown;
//   ticks?: (count: number) => ScaleInput[] | [ScaleInput, ScaleInput];
//   bandwidth?: () => number;
//   round?: () => boolean;
//   tickFormat?: () => (input: ScaleInput) => FormattedValue;
//   copy(): this;
// }

// // We cannot have optional methods AND overloads, so define a separate type for rangeRound
// interface ScaleWithRangeRound<ScaleInput> extends ScaleNoRangeRound<ScaleInput> {
//   rangeRound(): ScaleOutput[] | [ScaleOutput, ScaleOutput];
//   rangeRound(scaleOutput: ScaleOutput[] | [ScaleOutput, ScaleOutput]): unknown;
// }
