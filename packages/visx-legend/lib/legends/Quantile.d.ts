/// <reference types="react" />
import { PickD3Scale } from '@visx/scale';
import { LegendProps } from './Legend';
declare type AnyQuantileScale = PickD3Scale<'quantile', any>;
declare type FactoryProps = {
    labelDelimiter?: string;
};
export declare type LegendQuantileProps<Scale extends AnyQuantileScale> = LegendProps<Scale> & FactoryProps;
/** A Quantile scale takes a number input and returns an Output. */
export default function Quantile<Scale extends AnyQuantileScale>({ domain: inputDomain, scale, labelFormat, labelTransform: inputLabelTransform, labelDelimiter, ...restProps }: LegendQuantileProps<Scale>): JSX.Element;
export {};
//# sourceMappingURL=Quantile.d.ts.map