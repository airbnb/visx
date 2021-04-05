/// <reference types="react" />
import { Point } from '@visx/point';
interface SimplePoint {
    x: number;
    y: number;
}
export declare type LinePathAnnotationProps = {
    /**
     * A top pixel offset applied to the entire bar group.
     */
    top?: number;
    /**
     * A left pixel offset applied to the entire bar group.
     */
    left?: number;
    /**
     * An array of points describing the line path.
     */
    points?: (Point | SimplePoint)[];
    /**
     * The color of the line.
     */
    stroke?: string;
    /**
     * The pixel width of the line.
     */
    strokeWidth?: number;
    /**
     * Add a class name to the line path.
     */
    className?: string;
    /**
     * The text for your label.
     */
    label?: string;
    /**
     * The label's textAnchor.
     */
    labelAnchor?: 'start' | 'middle' | 'end';
    /**
     * The x-coordinate shift to the label.
     */
    labelDx?: number;
    /**
     * The y-coordinate shift to the label
     */
    labelDy?: number;
    /**
     * The color of label. Defaults to *props*.**stroke**.
     */
    labelFill?: string;
    /**
     * The font size of the label text.
     */
    labelFontSize?: number;
    /**
     * The color of the label.
     */
    labelStroke?: string;
    /**
     * The stroke width of the label text.
     */
    labelStrokeWidth?: number;
    /**
     * The label's SVG [paint-order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/paint-order).
     */
    labelPaintOrder?: string;
};
export default function LinePathAnnotation({ top, left, points, stroke, strokeWidth, className, label, labelAnchor, labelDx, labelDy, labelFill, labelFontSize, labelStroke, labelStrokeWidth, labelPaintOrder, }: LinePathAnnotationProps): JSX.Element;
export {};
//# sourceMappingURL=LinePathAnnotation.d.ts.map