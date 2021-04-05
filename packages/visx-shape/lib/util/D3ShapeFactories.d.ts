import { ArcPathConfig, AreaPathConfig, LinePathConfig, PiePathConfig, RadialLinePathConfig, StackPathConfig } from '../types';
export declare function arc<Datum>({ innerRadius, outerRadius, cornerRadius, startAngle, endAngle, padAngle, padRadius, }?: ArcPathConfig<Datum>): import("d3-shape").Arc<any, Datum>;
export declare function area<Datum>({ x, x0, x1, y, y0, y1, defined, curve }?: AreaPathConfig<Datum>): import("d3-shape").Area<Datum>;
export declare function line<Datum>({ x, y, defined, curve }?: LinePathConfig<Datum>): import("d3-shape").Line<Datum>;
export declare function pie<Datum>({ startAngle, endAngle, padAngle, value, sort, sortValues, }?: PiePathConfig<Datum>): import("d3-shape").Pie<any, Datum>;
export declare function radialLine<Datum>({ angle, radius, defined, curve, }?: RadialLinePathConfig<Datum>): import("d3-shape").RadialLine<Datum>;
export declare function stack<Datum, Key>({ keys, value, order, offset }: StackPathConfig<Datum, Key>): import("d3-shape").Stack<any, Datum, Key>;
//# sourceMappingURL=D3ShapeFactories.d.ts.map