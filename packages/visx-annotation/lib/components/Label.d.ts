import React from 'react';
import { TextProps } from '@visx/text/lib/Text';
import { Options as UseMeasureOptions } from 'react-use-measure';
export declare type LabelProps = {
    /** Stroke color of anchor line. */
    anchorLineStroke?: string;
    /** Background color of label. */
    backgroundFill?: string;
    /** Padding of text from background. */
    backgroundPadding?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    /** Additional props to be passed to background SVGRectElement. */
    backgroundProps?: React.SVGProps<SVGRectElement>;
    /** Optional className to apply to container in addition to 'visx-annotation-label'. */
    className?: string;
    /** Color of title and subtitle text. */
    fontColor?: string;
    /** Whether the label is horizontally anchored to the start, middle, or end of its x position. */
    horizontalAnchor?: TextProps['textAnchor'];
    /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
    resizeObserverPolyfill?: UseMeasureOptions['polyfill'];
    /** Whether to render a line indicating label text anchor. */
    showAnchorLine?: boolean;
    /** Whether to render a label background. */
    showBackground?: boolean;
    /** Optional subtitle. */
    subtitle?: string;
    /** Optional title font size. */
    subtitleFontSize?: TextProps['fontSize'];
    /** Optional title font weight. */
    subtitleFontWeight?: TextProps['fontWeight'];
    /** The vertical offset of the subtitle from the title. */
    subtitleDy?: number;
    /** Optional subtitle Text props (to override color, etc.). */
    subtitleProps?: Partial<TextProps>;
    /** Optional title. */
    title?: string;
    /** Optional title font size. */
    titleFontSize?: TextProps['fontSize'];
    /** Optional title font weight. */
    titleFontWeight?: TextProps['fontWeight'];
    /** Optional title Text props (to override color, etc.). */
    titleProps?: Partial<TextProps>;
    /** Whether the label is vertically anchored to the start, middle, or end of its y position. */
    verticalAnchor?: TextProps['verticalAnchor'];
    /** Width of annotation, including background, for text wrapping. */
    width?: number;
    /** Left offset of entire AnnotationLabel, if not specified uses x + dx from Annotation. */
    x?: number;
    /** Top offset of entire AnnotationLabel, if not specified uses y + dy from Annotation. */
    y?: number;
};
export default function Label({ anchorLineStroke, backgroundFill, backgroundPadding, backgroundProps, className, fontColor, horizontalAnchor: propsHorizontalAnchor, resizeObserverPolyfill, showAnchorLine, showBackground, subtitle, subtitleDy, subtitleFontSize, subtitleFontWeight, subtitleProps, title, titleFontSize, titleFontWeight, titleProps, verticalAnchor: propsVerticalAnchor, width, x: propsX, y: propsY, }: LabelProps): JSX.Element | null;
//# sourceMappingURL=Label.d.ts.map