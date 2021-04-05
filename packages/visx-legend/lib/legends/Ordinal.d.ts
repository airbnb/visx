/// <reference types="react" />
import { PickD3Scale } from '@visx/scale';
import { LegendProps } from './Legend';
declare type AnyOrdinalScale = PickD3Scale<'ordinal', any, any>;
export declare type LegendOrdinalProps<Scale extends AnyOrdinalScale> = LegendProps<Scale>;
/** Ordinal scales map from strings to an Output type. */
export default function Ordinal<Scale extends AnyOrdinalScale>(props: LegendOrdinalProps<Scale>): JSX.Element;
export {};
//# sourceMappingURL=Ordinal.d.ts.map