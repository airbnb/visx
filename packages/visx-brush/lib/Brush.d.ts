import React, { Component } from 'react';
import BaseBrush, { BaseBrushProps, BaseBrushState } from './BaseBrush';
import { Bounds, PartialBrushStartEnd, MarginShape, Point, ResizeTriggerAreas, Scale } from './types';
export declare type BrushProps = {
    /** Style object for the Brush selection rect. */
    selectedBoxStyle: React.SVGProps<SVGRectElement>;
    /** x-coordinate scale. */
    xScale: Scale;
    /** y-coordinate scale. */
    yScale: Scale;
    /** Brush stage height. */
    height: number;
    /** Brush stage width. */
    width: number;
    /** Callback invoked on a change in Brush bounds. */
    onChange?: (bounds: Bounds | null) => void;
    /** Callback invoked on initialization of a Brush (not Brush move). */
    onBrushStart?: BaseBrushProps['onBrushStart'];
    /** Callback invoked on mouse up when a Brush size is being updated. */
    onBrushEnd?: (bounds: Bounds | null) => void;
    /** Callback invoked on mouse move in Brush stage when *not* dragging. */
    onMouseMove?: BaseBrushProps['onMouseMove'];
    /** Callback invoked on mouse leave from Brush stage when *not* dragging. */
    onMouseLeave?: BaseBrushProps['onMouseLeave'];
    /** Callback invoked on Brush stage click. */
    onClick?: BaseBrushProps['onClick'];
    /** Margin subtracted from Brush stage dimensions. */
    margin?: MarginShape;
    /** Allowed directions for Brush dimensional change. */
    brushDirection?: 'vertical' | 'horizontal' | 'both';
    /** Initial start and end position of the Brush. */
    initialBrushPosition?: PartialBrushStartEnd;
    /** Array of rect sides and corners which should be resizeable / can trigger a Brush size change. */
    resizeTriggerAreas?: ResizeTriggerAreas[];
    /** What is being brushed, used for margin subtraction. */
    brushRegion?: 'xAxis' | 'yAxis' | 'chart';
    /** Orientation of yAxis if `brushRegion=yAxis`. */
    yAxisOrientation?: 'left' | 'right';
    /** Orientation of xAxis if `brushRegion=xAxis`. */
    xAxisOrientation?: 'top' | 'bottom';
    /** Whether movement of Brush should be disabled. */
    disableDraggingSelection: boolean;
    /** Whether to reset the Brush on drag end. */
    resetOnEnd?: boolean;
    /** Size of Brush handles, applies to all `resizeTriggerAreas`. */
    handleSize: number;
    /** Reference to the BaseBrush component. */
    innerRef?: React.MutableRefObject<BaseBrush | null>;
};
declare class Brush extends Component<BrushProps> {
    static defaultProps: {
        xScale: null;
        yScale: null;
        onChange: null;
        height: number;
        width: number;
        selectedBoxStyle: {
            fill: string;
            fillOpacity: number;
            stroke: string;
            strokeWidth: number;
            strokeOpacity: number;
        };
        margin: {
            top: number;
            left: number;
            right: number;
            bottom: number;
        };
        handleSize: number;
        brushDirection: string;
        initialBrushPosition: null;
        resizeTriggerAreas: string[];
        brushRegion: string;
        yAxisOrientation: string;
        xAxisOrientation: string;
        onBrushStart: null;
        onBrushEnd: null;
        disableDraggingSelection: boolean;
        resetOnEnd: boolean;
        onMouseMove: null;
        onMouseLeave: null;
        onClick: null;
    };
    handleChange: (brush: BaseBrushState) => void;
    convertRangeToDomain(brush: BaseBrushState): Bounds;
    handleBrushStart: (point: Point) => void;
    handleBrushEnd: (brush: BaseBrushState) => void;
    render(): JSX.Element | null;
}
export default Brush;
//# sourceMappingURL=Brush.d.ts.map