import React from 'react';
import { AnyD3Scale, ScaleInput } from '@visx/scale';
import { LegendLabelProps } from './LegendLabel';
import { FlexDirection, FormattedLabel, LabelFormatter, LabelFormatterFactory, LegendShape as LegendShapeType } from '../../types';
export declare type LegendProps<Scale extends AnyD3Scale> = {
    /** Optional render function override. */
    children?: (labels: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>[]) => React.ReactNode;
    /** Classname to be applied to legend container. */
    className?: string;
    /** Styles to be applied to the legend container. */
    style?: React.CSSProperties;
    /** Legend domain. */
    domain?: ScaleInput<Scale>[];
    /** Width of the legend shape. */
    shapeWidth?: string | number;
    /** Height of the legend shape. */
    shapeHeight?: string | number;
    /** Margin of the legend shape. */
    shapeMargin?: string | number;
    /** Flex-box alignment of legend item labels. */
    labelAlign?: string;
    /** `@visx/scale` or `d3-scale` object used to generate the legend items. */
    scale: Scale;
    /** Flex-box flex of legend item labels. */
    labelFlex?: string | number;
    /** Margin of legend item labels. */
    labelMargin?: string | number;
    /** Margin of legend items. */
    itemMargin?: string | number;
    /** Flex direction of the legend itself. */
    direction?: FlexDirection;
    /** Flex direction of legend items. */
    itemDirection?: FlexDirection;
    /** Legend item fill accessor function. */
    fill?: (label: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>) => string | number | undefined;
    /** Legend item size accessor function. */
    size?: (label: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>) => string | number | undefined;
    /** Legend shape string preset or Element or Component. */
    shape?: LegendShapeType<ScaleInput<Scale>, ReturnType<Scale>>;
    /** Styles applied to legend shapes. */
    shapeStyle?: (label: FormattedLabel<ScaleInput<Scale>, ReturnType<Scale>>) => React.CSSProperties;
    /** Given a legend item and its index, returns an item label. */
    labelFormat?: LabelFormatter<ScaleInput<Scale>>;
    /** Given the legend scale and labelFormatter, returns a label with datum, index, value, and label. */
    labelTransform?: LabelFormatterFactory<Scale>;
    /** Additional props to be set on LegendLabel. */
    legendLabelProps?: Partial<LegendLabelProps>;
};
export default function Legend<Scale extends AnyD3Scale>({ className, style, scale, shape, domain: inputDomain, fill, size, labelFormat, labelTransform, shapeWidth, shapeHeight, shapeMargin, shapeStyle, labelAlign, labelFlex, labelMargin, itemMargin, direction, itemDirection, legendLabelProps, children, ...legendItemProps }: LegendProps<Scale>): JSX.Element;
//# sourceMappingURL=index.d.ts.map