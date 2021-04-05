/// <reference types="react" />
import { PickD3Scale } from '@visx/scale';
import { LegendProps } from './Legend';
import { LabelFormatterFactory } from '../types';
declare type AnyThresholdScale = PickD3Scale<'threshold', any, any, any>;
declare type TransformProps = {
    labelDelimiter?: string;
    labelLower?: string;
    labelUpper?: string;
};
export declare type LegendThresholdProps<Scale extends AnyThresholdScale> = LegendProps<Scale> & TransformProps & {
    labelTransform?: LabelFormatterFactory<Scale>;
};
export default function Threshold<Scale extends AnyThresholdScale>({ scale, domain: inputDomain, labelFormat, labelTransform: inputLabelTransform, labelDelimiter, labelLower, labelUpper, ...restProps }: LegendThresholdProps<Scale>): JSX.Element;
export {};
//# sourceMappingURL=Threshold.d.ts.map