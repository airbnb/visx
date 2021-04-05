import React from 'react';
import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { PickD3Scale } from '@visx/scale';
import { Annotation, EditableAnnotation } from '@visx/annotation';
import { AnnotationProps } from './Example';
declare type ExampleControlsProps = AnnotationProps & {
    children: (props: ProvidedProps) => React.ReactNode;
};
declare type AnnotationPosition = {
    x: number;
    y: number;
    dx: number;
    dy: number;
};
declare type ProvidedProps = {
    AnnotationComponent: typeof Annotation | typeof EditableAnnotation;
    anchorLinePosition?: 'auto' | 'all' | 'none';
    annotationPosition: AnnotationPosition;
    approxTooltipHeight: number;
    connectorType: 'line' | 'elbow';
    data: AppleStock[];
    editLabelPosition: boolean;
    editSubjectPosition: boolean;
    getDate: (d: AppleStock) => number;
    getStockValue: (d: AppleStock) => number;
    horizontalAnchor?: 'start' | 'middle' | 'end';
    labelWidth: number;
    setAnnotationPosition: (position: AnnotationPosition) => void;
    showAnchorLine: boolean;
    subjectType: 'circle' | 'horizontal-line' | 'vertical-line';
    subtitle: string;
    title: string;
    verticalAnchor?: 'start' | 'middle' | 'end';
    xScale: PickD3Scale<'time', number>;
    yScale: PickD3Scale<'linear', number>;
};
export default function ExampleControls({ width, height, compact, children, }: ExampleControlsProps): JSX.Element;
export {};
//# sourceMappingURL=ExampleControls.d.ts.map