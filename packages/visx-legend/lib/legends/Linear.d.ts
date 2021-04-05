/// <reference types="react" />
import { PickD3Scale } from '@visx/scale';
import { LegendProps } from './Legend';
declare type AnyLinearScale = PickD3Scale<'linear', any>;
export declare type LegendLinearProps<Scale extends AnyLinearScale> = {
    steps?: number;
} & LegendProps<Scale>;
/** Linear scales map from continuous inputs to continuous outputs. */
export default function Linear<Scale extends AnyLinearScale>({ scale, domain: inputDomain, steps, ...restProps }: LegendLinearProps<Scale>): JSX.Element;
export {};
//# sourceMappingURL=Linear.d.ts.map