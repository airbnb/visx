import React from 'react';
export declare type LegendLabelOwnProps = {
    align?: string;
    label?: React.ReactNode;
    flex?: string | number;
    margin?: string | number;
    children?: React.ReactNode;
};
export declare type LegendLabelProps = LegendLabelOwnProps & Omit<React.HTMLProps<HTMLDivElement>, keyof LegendLabelOwnProps>;
export default function LegendLabel({ flex, label, margin, align, children, ...restProps }: LegendLabelProps): JSX.Element;
//# sourceMappingURL=LegendLabel.d.ts.map