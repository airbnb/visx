import React from "react";
import { HandlerArgs as DragArgs } from "@visx/drag/lib/Drag";
import { MarginShape, Point, BrushShape, ResizeTriggerAreas, PartialBrushStartEnd } from "./types";
declare type MouseHandlerEvent = React.MouseEvent<SVGRectElement, MouseEvent> | React.TouchEvent<SVGRectElement>;
export declare type BaseBrushProps = {
    brushDirection?: "horizontal" | "vertical" | "both";
    initialBrushPosition?: PartialBrushStartEnd;
    width: number;
    height: number;
    left: number;
    top: number;
    inheritedMargin?: MarginShape;
    onChange?: (state: BaseBrushState) => void;
    handleSize: number;
    resizeTriggerAreas?: ResizeTriggerAreas[];
    onBrushStart?: (start: BaseBrushState["start"]) => void;
    onBrushEnd?: (state: BaseBrushState) => void;
    selectedBoxStyle: React.SVGProps<SVGRectElement>;
    onMouseLeave?: (event: MouseHandlerEvent) => void;
    onMouseUp?: (event: MouseHandlerEvent) => void;
    onMouseMove?: (event: MouseHandlerEvent) => void;
    onClick?: (event: MouseHandlerEvent) => void;
    clickSensitivity: number;
    disableDraggingSelection: boolean;
    resetOnEnd?: boolean;
};
export declare type BaseBrushState = BrushShape & {
    activeHandle: ResizeTriggerAreas | null;
    isBrushing: boolean;
};
export declare type UpdateBrush = BaseBrushState | ((prevState: Readonly<BaseBrushState>, props: Readonly<BaseBrushProps>) => BaseBrushState);
export default class BaseBrush extends React.Component<BaseBrushProps, BaseBrushState> {
    private constructor();
    private mouseUpTime;
    private mouseDownTime;
    static defaultProps: {
        brushDirection: string;
        inheritedMargin: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        };
        onChange: null;
        handleSize: number;
        resizeTriggerAreas: string[];
        onBrushStart: null;
        onBrushEnd: null;
        onMouseLeave: null;
        onMouseUp: null;
        onMouseMove: null;
        onClick: null;
        disableDraggingSelection: boolean;
        clickSensitivity: number;
        resetOnEnd: boolean;
        initialBrushPosition: null;
    };
    componentDidUpdate(prevProps: BaseBrushProps): void;
    getExtent: (start: Partial<Point>, end: Partial<Point>) => {
        x0: number;
        x1: number;
        y0: number;
        y1: number;
    };
    handleDragStart: (draw: DragArgs) => void;
    handleDragMove: (drag: DragArgs) => void;
    handleDragEnd: () => void;
    getBrushWidth: () => number;
    getBrushHeight: () => number;
    handles: () => Partial<{
        bottom: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        left: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        right: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        top: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        topLeft: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        topRight: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        bottomLeft: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        bottomRight: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
    }>;
    corners: () => Partial<{
        bottom: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        left: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        right: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        top: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        topLeft: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        topRight: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        bottomLeft: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        bottomRight: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    }>;
    updateBrush: (updater: UpdateBrush) => void;
    reset: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=BaseBrush.d.ts.map