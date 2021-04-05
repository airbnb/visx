import { CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { Accessor, AccessorForArrayItem } from './accessor';
import { STACK_OFFSETS } from '../util/stackOffset';
import { STACK_ORDERS } from '../util/stackOrder';
export declare type ArcPathConfig<Datum> = {
    /** Number or accessor function which returns a number, which defines the arc innerRadius. */
    innerRadius?: number | Accessor<Datum, number>;
    /** Number or accessor function which returns a number, which defines the arc outerRadius. */
    outerRadius?: number | Accessor<Datum, number>;
    /** Number or accessor function which returns a number, which defines the arc cornerRadius. */
    cornerRadius?: number | Accessor<Datum, number>;
    /** Number or accessor function which returns a number, which defines the arc startAngle. */
    startAngle?: number | Accessor<Datum, number>;
    /** Number or accessor function which returns a number, which defines the arc endAngle. */
    endAngle?: number | Accessor<Datum, number>;
    /** Number or accessor function which returns a number, which defines the arc padAngle. */
    padAngle?: number | Accessor<Datum, number>;
    /** Number or accessor function which returns a number, which defines the arc padRadius. */
    padRadius?: number | Accessor<Datum, number>;
};
export declare type AreaPathConfig<Datum> = {
    /** The defined accessor for the shape. The final area shape includes all points for which this function returns true. By default all points are defined. */
    defined?: AccessorForArrayItem<Datum, boolean>;
    /** Sets the curve factory (from @visx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
    curve?: CurveFactory;
    /** Sets the x0 accessor function, and sets x1 to null. */
    x?: number | AccessorForArrayItem<Datum, number>;
    /** Specifies the x0 accessor function which defaults to d => d[0]. */
    x0?: number | AccessorForArrayItem<Datum, number>;
    /** Specifies the x1 accessor function which defaults to null. */
    x1?: number | AccessorForArrayItem<Datum, number>;
    /** Sets the y0 accessor function, and sets y1 to null. */
    y?: number | AccessorForArrayItem<Datum, number>;
    /** Specifies the y0 accessor function which defaults to d => 0. */
    y0?: number | AccessorForArrayItem<Datum, number>;
    /** Specifies the y1 accessor function which defaults to d => d[1]. */
    y1?: number | AccessorForArrayItem<Datum, number>;
};
export declare type LinePathConfig<Datum> = {
    /** The defined accessor for the shape. The final line shape includes all points for which this function returns true. By default all points are defined. */
    defined?: AccessorForArrayItem<Datum, boolean>;
    /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
    curve?: CurveFactory | CurveFactoryLineOnly;
    /** Sets the x0 accessor function, and sets x1 to null. */
    x?: number | AccessorForArrayItem<Datum, number>;
    /** Sets the y0 accessor function, and sets y1 to null. */
    y?: number | AccessorForArrayItem<Datum, number>;
};
declare type AngleAccessor<Datum> = (this: any, data: Datum[], ...args: any[]) => number;
export declare type PiePathConfig<Datum> = {
    /** Returns the start angle of the overall Pie shape (the first value starts at startAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
    startAngle?: number | AngleAccessor<Datum>;
    /** Returns the end angle of the overall Pie shape (the last value ends at endAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
    endAngle?: number | AngleAccessor<Datum>;
    /** Padding angle of the Pie shape, which sets a fixed linear distance separating adjacent arcs. */
    padAngle?: number | AngleAccessor<Datum>;
    /** Invoked for each datum, returns the value for a given Pie segment/arc datum. */
    value?: Accessor<Datum, number>;
    /** Comparator function to sort *arcs*, overridden by sortValues if defined. If sort and sortValues are null, arcs match input data order. */
    sort?: null | ((a: Datum, b: Datum) => number);
    /** Comparator function to sort arc *values*, overrides sort if defined. If sort and sortValues are null, arcs match input data order. */
    sortValues?: null | ((a: number, b: number) => number);
};
export declare type RadialLinePathConfig<Datum> = {
    /** The defined accessor for the shape. The final radialLine shape includes all points for which this function returns true. By default all points are defined. */
    defined?: AccessorForArrayItem<Datum, boolean>;
    /** Sets the curve factory (from @visx/curve or d3-curve) for the radialLine generator. Defaults to curveLinear. */
    curve?: CurveFactory | CurveFactoryLineOnly;
    /** Returns the angle value in radians for a given Datum, with 0 at -y (12 o’clock). */
    angle?: number | AccessorForArrayItem<Datum, number>;
    /** Returns the radius value in radians for a given Datum, with 0 at the center. */
    radius?: number | AccessorForArrayItem<Datum, number>;
};
export declare type StackPathConfig<Datum, Key> = {
    /** Array of keys corresponding to stack layers. */
    keys?: Key[];
    /** Sets the stack offset to the pre-defined d3 offset, see https://github.com/d3/d3-shape#stack_offset. */
    offset?: keyof typeof STACK_OFFSETS;
    /** Sets the stack order to the pre-defined d3 function, see https://github.com/d3/d3-shape#stack_order. */
    order?: keyof typeof STACK_ORDERS;
    /** Sets the value accessor for a Datum, which defaults to d[key]. */
    value?: number | ((d: Datum, key: Key) => number);
};
export {};
//# sourceMappingURL=D3ShapeConfig.d.ts.map