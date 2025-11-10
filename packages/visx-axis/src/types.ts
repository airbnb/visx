import type { D3Scale, NumberLike, ScaleInput, ValueOf } from '@visx/scale';
import type { TextProps } from '@visx/text';
import type { ReactNode, Ref, SVGProps } from 'react';
import type Orientation from './constants/orientation';

// In order to plot values on an axis, output of the scale must be number.
// Some scales return undefined.
export type AxisScaleOutput = number | NumberLike | undefined;

/** A catch-all type for scales that are compatible with axis */
export type AxisScale<Output extends AxisScaleOutput = AxisScaleOutput> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D3Scale<Output, any, any>;
type LineProps = Omit<SVGProps<SVGLineElement>, 'to' | 'from' | 'ref'>;

type FormattedValue = string | undefined;

export type TickFormatter<T> = (
  value: T,
  index: number,
  values: { value: T; index: number }[],
) => FormattedValue;

export type TickLabelProps<T> =
  | Partial<TextProps>
  | ((value: T, index: number, values: { value: T; index: number }[]) => Partial<TextProps>);

export type TickRendererProps = Partial<TextProps> & {
  x: number;
  y: number;
  formattedValue: FormattedValue;
};

export type TicksRendererProps<Scale extends AxisScale> = {
  tickLabelProps: Partial<TextProps>[];
} & Pick<
  AxisRendererProps<Scale>,
  | 'hideTicks'
  | 'horizontal'
  | 'orientation'
  | 'scale'
  | 'tickClassName'
  | 'tickComponent'
  | 'tickStroke'
  | 'tickTransform'
  | 'ticks'
  | 'strokeWidth'
  | 'tickLineProps'
>;

export type CommonProps<Scale extends AxisScale> = {
  /** The class name applied to the axis line element. */
  axisLineClassName?: string;
  /**  If true, will hide the axis line. */
  hideAxisLine?: boolean;
  /** If true, will hide the ticks (but not the tick labels). */
  hideTicks?: boolean;
  /** If true, will hide the '0' value tick and tick label. */
  hideZero?: boolean;
  /** The text for the axis label. */
  label?: string;
  /** The class name applied to the axis label text element. */
  labelClassName?: string;
  /** Pixel offset of the axis label (does not include tick label font size, which is accounted for automatically)  */
  labelOffset?: number;
  /** Props applied to the axis label component. */
  labelProps?: Partial<TextProps>;
  /** The number of ticks wanted for the axis (note this is approximate)  */
  numTicks?: number;
  /** Placement of the axis */
  orientation?: ValueOf<typeof Orientation>;
  /** Pixel padding to apply to axis sides. */
  rangePadding?: number | { start?: number; end?: number };
  /** The color for the stroke of the lines. */
  stroke?: string;
  /** The pixel value for the width of the lines. */
  strokeWidth?: number | string;
  /** The pattern of dashes in the stroke. */
  strokeDasharray?: string;
  /** Props to be applied to individual tick lines. */
  tickLineProps?: LineProps;
  /** The class name applied to each tick group. */
  tickClassName?: string;
  /** Override the component used to render tick labels (instead of <Text /> from @visx/text). */
  tickComponent?: (tickRendererProps: TickRendererProps) => ReactNode;
  /** Override the component used to render all tick lines and labels. */
  ticksComponent?: (tickRendererProps: TicksRendererProps<Scale>) => ReactNode;
  /** A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. */
  tickFormat?: TickFormatter<ScaleInput<Scale>>;
  /** Either an object with the props for all tick labels or a function that returns props for a given tick label. */
  tickLabelProps?: TickLabelProps<ScaleInput<Scale>>;
  /** The length of the tick lines. */
  tickLength?: number;
  /** The color for the tick's stroke value. */
  tickStroke?: string;
  /** A custom SVG transform value to be applied to each tick group. */
  tickTransform?: string;
};

interface Point {
  x: number;
  y: number;
}

export type ComputedTick<Scale extends AxisScale> = {
  value: ScaleInput<Scale>;
  index: number;
  from: Point;
  to: Point;
  formattedValue: FormattedValue;
};

export type AxisRendererProps<Scale extends AxisScale> = CommonProps<Scale> & {
  /** Start point of the axis line */
  axisFromPoint: Point;
  /** End point of the axis line */
  axisToPoint: Point;
  /** Whether this axis is horizontal */
  horizontal: boolean;
  /** A [d3](https://github.com/d3/d3-scale) or [visx](https://github.com/airbnb/visx/tree/master/packages/visx-scale) scale function. */
  scale: Scale;
  /** Function to compute tick position along the axis from tick value */
  tickPosition: (value: ScaleInput<Scale>) => AxisScaleOutput;
  /** Axis coordinate sign, -1 for left or top orientation. */
  tickSign: 1 | -1;
  /** Computed ticks with positions and formatted value */
  ticks: ComputedTick<Scale>[];
};

export type SharedAxisProps<Scale extends AxisScale> = CommonProps<Scale> & {
  /** The class name applied to the outermost axis group element. */
  axisClassName?: string;
  /** A left pixel offset applied to the entire axis. */
  left?: number;
  /** The ref to the outermost axis group element. */
  innerRef?: Ref<SVGGElement>;
  /** A [d3](https://github.com/d3/d3-scale) or [visx](https://github.com/airbnb/visx/tree/master/packages/visx-scale) scale function. */
  scale: Scale;
  /** An array of values that determine the number and values of the ticks. Falls back to `scale.ticks()` or `.domain()`. */
  tickValues?: ScaleInput<Scale>[];
  /** A top pixel offset applied to the entire axis. */
  top?: number;
  /** For more control over rendering or to add event handlers to datum, pass a function as children. */
  children?: (renderProps: AxisRendererProps<Scale>) => ReactNode;
};
