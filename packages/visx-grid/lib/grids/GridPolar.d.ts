import React, { CSSProperties } from 'react';
import { ScaleInput } from '@visx/scale';
import { LineProps } from '@visx/shape/lib/shapes/Line';
import { CommonGridProps, GridScale } from '../types';
export declare type GridPolarProps<AngleScale extends GridScale, RadialScale extends GridScale> = CommonGridProps & {
    /**
     * If specified, the arc of each radial grid line will have this thickness, useful for fills.
     */
    arcThickness?: number;
    /**
     * The class name applied to the angle grid group.
     */
    classNameAngle?: string;
    /**
     * The class name applied to the radial grid group.
     */
    classNameRadial?: string;
    /**
     * The end angle of the arc of radial grid lines in radians.
     */
    endAngle?: number;
    /**
     * The color applied to the fill of the radial lines.
     */
    fillRadial?: string;
    /**
     * Radius which determines the start position of angle lines.
     */
    innerRadius?: number;
    /**
     * Classname applied to all angle line paths.
     */
    lineClassNameAngle?: string;
    /**
     * Classname applied to all radial line paths.
     */
    lineClassNameRadial?: string;
    /**
     * Style object set as the angle line path style attribute.
     */
    lineStyleAngle?: CSSProperties & LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>;
    /**
     * Style object set as the radius line path style attribute.
     */
    lineStyleRadial?: CSSProperties & LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>;
    /**
     * The number of angle ticks wanted for the grid. Note this is approximate due to d3's algorithm,
     * you can use tickValues for greater control
     */
    numTicksAngle?: number;
    /**
     * The number of radial ticks wanted for the grid. Note this is approximate due to d3's algorithm,
     * you can use tickValues for greater control
     */
    numTicksRadial?: number;
    /**
     * Radius which determines the end position of angle lines.
     */
    outerRadius: number;
    /**
     * A [d3](https://github.com/d3/d3-scale) or [visx](https://github.com/airbnb/visx/tree/master/packages/visx-scale)
     * scale function used to generate the angle of angle lines.
     */
    scaleAngle: AngleScale;
    /**
     * A [d3](https://github.com/d3/d3-scale) or [visx](https://github.com/airbnb/visx/tree/master/packages/visx-scale)
     * scale function used to generate the radius of radial lines.
     */
    scaleRadial: RadialScale;
    /**
     * The start angle of the arc of radial grid lines in radians.
     */
    startAngle?: number;
    /**
     * The color applied to the stroke of the angle lines.
     */
    strokeAngle?: string;
    /**
     * The color applied to the stroke of the radial lines.
     */
    strokeRadial?: string;
    /**
     * The pattern of dashes for angle line stroke.
     */
    strokeDasharrayAngle?: string;
    /**
     * The pattern of dashes for angle radial stroke.
     */
    strokeDasharrayRadial?: string;
    /**
     * The pixel value for the width of the angle lines.
     */
    strokeWidthAngle?: string | number;
    /**
     * The pixel value for the width of the radial lines.
     */
    strokeWidthRadial?: string | number;
    /**
     * An array of values that determine the number and values of the angle ticks. Falls
     * back to `scale.ticks()` or `.domain()`.
     */
    tickValuesAngle?: ScaleInput<AngleScale>[];
    /**
     * An array of values that determine the number and values of the radial ticks. Falls
     * back to `scale.ticks()` or `.domain()`.
     */
    tickValuesRadial?: ScaleInput<RadialScale>[];
    /**
     * A top pixel offset applied to the entire grid group.
     */
    top?: number;
};
export default function GridPolar<Scale extends GridScale>({ arcThickness, className, classNameAngle, classNameRadial, endAngle, fillRadial, innerRadius, left, lineClassNameAngle, lineClassNameRadial, lineStyleAngle, lineStyleRadial, numTicksAngle, numTicksRadial, outerRadius, scaleAngle, scaleRadial, startAngle, strokeAngle, strokeRadial, strokeWidthAngle, strokeWidthRadial, strokeDasharrayAngle, strokeDasharrayRadial, tickValuesAngle, tickValuesRadial, top, }: GridPolarProps<Scale, Scale>): JSX.Element;
//# sourceMappingURL=GridPolar.d.ts.map