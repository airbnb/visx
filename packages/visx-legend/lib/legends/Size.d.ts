/// <reference types="react" />
import { D3Scale } from '@visx/scale';
import { LegendProps } from './Legend';
declare type AnySizeScale = D3Scale<number, any, any>;
export declare type LegendSizeProps<Scale extends AnySizeScale> = {
    steps?: number;
} & LegendProps<Scale>;
export default function Size<Scale extends AnySizeScale>({ scale, domain: inputDomain, steps, labelFormat, labelTransform, ...restProps }: LegendSizeProps<Scale>): JSX.Element;
export {};
//# sourceMappingURL=Size.d.ts.map