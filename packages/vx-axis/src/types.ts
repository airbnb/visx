import { TextProps } from '@vx/text/lib/Text';

export type AxisOrientation = 'top' | 'right' | 'bottom' | 'left';

type Output = number;

export type FormattedValue = string | undefined;

export type TickFormatter<Input> = (value: Input, tickIndex: number) => FormattedValue;

export type TickLabelProps<Input> = (val: Input, index: number) => Partial<TextProps>;

export type TickRendererProps<Input> = {
  x: number;
  y: number;
  formattedValue: FormattedValue;
} & Omit<TickLabelProps<Input>, 'x' | 'y'>;

export type SharedAxisProps<Input> = {
  /** The class name applied to the outermost axis group element. */
  axisClassName?: string;
  /** The class name applied to the axis line element. */
  axisLineClassName?: string;
  /**  If true, will hide the axis line.  */
  hideAxisLine?: boolean;
  /** If true, will hide the ticks (but not the tick labels).  */
  hideTicks: boolean;
  /** If true, will hide the '0' value tick and tick label.  */
  hideZero: boolean;
  /** The text for the axis label.  */
  label?: string;
  /** The class name applied to the axis label text element.  */
  labelClassName?: string;
  /** Pixel offset of the axis label (does not include tick label font size, which is accounted for automatically)  */
  labelOffset?: number;
  /** Props applied to the axis label component.  */
  labelProps?: {};
  /** A left pixel offset applied to the entire axis.  */
  left?: number;
  /** The number of ticks wanted for the axis (note this is approximate)  */
  numTicks?: number;
  /** Pixel padding to apply to both sides of the axis.  */
  rangePadding?: number;
  /** A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function.  */
  scale: GenericScale<Input>;
  /** The color for the stroke of the lines.  */
  stroke?: string;
  /** The pixel value for the width of the lines.  */
  strokeWidth?: number;
  /** The pattern of dashes in the stroke.  */
  strokeDasharray?: string;
  /** The class name applied to each tick group.  */
  tickClassName?: string;
  /** A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text.  */
  tickFormat: TickFormatter<Input>;
  /** A function that returns props for a given tick label.  */
  tickLabelProps: TickLabelProps<Input>;
  /** The length of the tick lines.  */
  tickLength?: number;
  /** The color for the tick's stroke value.  */
  tickStroke?: string;
  /** A custom SVG transform value to be applied to each tick group.  */
  tickTransform?: string;
  /** An array of values that determine the number and values of the ticks. Falls back to `scale.ticks()` or `.domain()`.  */
  tickValues: Input[];
  /**  */
  tickComponent: (tickRendererProps: TickRendererProps<Input>) => React.ReactNode;
  /** A top pixel offset applied to the entire axis.  */
  top?: number;
  /** For more control over rendering or to add event handlers to datum, pass a function as children.  */
  children: (renderProps: ChildRenderProps<Input>) => React.ReactNode;
};

export interface GenericScale<Input = unknown> {
  (value: Input): Output;
  domain(input: Input[]): this;
  domain(): Input[] | [Input, Input];
  range(): Output[] | [Output, Output];
  range(output: Output[]): this;
  ticks?: (count: number) => Input[] | [Input, Input];
  bandwidth?: () => number;
  round?: () => boolean;
  tickFormat?: () => (input: Input) => FormattedValue;
  copy(): this;
}

export interface Point {
  x: number;
  y: number;
}

export type ChildRenderProps<Input> = {
  axisFromPoint: Point;
  axisToPoint: Point;
  horizontal: boolean;
  /** Axis coordinate sign, -1 for left or top orientation. */
  tickSign: 1 | -1;
  numTicks: number;
  label?: string;
  rangePadding: number;
  tickLength: number;
  tickFormat: TickFormatter<Input>;
  tickPosition: (value: Input) => Output;
  ticks: {
    value: Input;
    index: number;
    from: Point;
    to: Point;
    formattedValue: Input | string | undefined | null;
  }[];
  //       ticks: values.map((value, index) => {
  //         const from = new Point({
  //           x: horizontal ? position(value) : 0,
  //           y: horizontal ? 0 : position(value),
  //         });
  //         const to = new Point({
  //           x: horizontal ? position(value) : tickSign * tickLength,
  //           y: horizontal ? tickLength * tickSign : position(value),
  //         });
  //         return {
  //           value,
  //           index,
  //           from,
  //           to,
  //           formattedValue: format(value, index),
  //         };
  //       }),
};

// eslint doesn't know about @types/d3-scale
// eslint-disable-next-line import/no-extraneous-dependencies
// import {
//   ScaleBand,
//   ScaleLinear,
//   ScaleLogarithmic,
//   ScaleOrdinal,
//   ScaleQuantile,
//   ScaleQuantize,
//   ScaleThreshold,
//   ScalePower,
//   ScaleTime,
// } from 'd3-scale';

// numberic domain
// export type ScaleType<
//   Input = unknown,
//   Output = unknown,
// > =
//   | ScaleBand<Input>
//   | ScaleLinear<Range, Output>
//   | ScaleLogarithmic<Output, Output>
//   | ScaleOrdinal<Input, Output>
//   | ScaleQuantile<Output>
//   | ScaleQuantize<Output>
//   | ScaleThreshold<StringNumberDateInput, Output>;

// export type ScaleType<S, Input, Output, Range> = S extends ScaleBand<Input>
//   ? ScaleBandScaleBand<Input>
//   : ScaleLinear<Range, Output>;
