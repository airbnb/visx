import React from 'react';
declare type MouseTouchOrPointerEvent = React.MouseEvent | React.TouchEvent | React.PointerEvent;
export declare type HandlerArgs = DragState & {
    /** Drag event. */
    event: MouseTouchOrPointerEvent;
};
export declare type UseDragOptions = {
    /** Whether to reset drag state upon the start of a new drag. */
    resetOnStart?: boolean;
    /** Optional callback invoked upon drag end. */
    onDragEnd?: (args: HandlerArgs) => void;
    /** Optional callback invoked upon drag movement. */
    onDragMove?: (args: HandlerArgs) => void;
    /** Optional callback invoked upon drag start. */
    onDragStart?: (args: HandlerArgs) => void;
    /** Optionally set the initial drag x, or override the current drag x. */
    x?: number;
    /** Optionally set the initial drag y, or override the current drag y. */
    y?: number;
    /** Optionally set the initial drag dx, or override the current drag dx. */
    dx?: number;
    /** Optionally set the initial drag dy, or override the current drag dy. */
    dy?: number;
};
export declare type DragState = {
    /** x position of drag at drag start time, reset to 0 if `resetOnStart=true`. */
    x?: number;
    /** y position of drag at drag start time, reset to 0 if `resetOnStart=true`. */
    y?: number;
    /** Change in x position since drag start, reset to 0 on drag start if `resetOnStart=true`. */
    dx: number;
    /** Change in y position since drag start, reset to 0 on drag start if `resetOnStart=true`. */
    dy: number;
    /** Whether a drag is currently in progress. */
    isDragging: boolean;
};
export declare type UseDrag = DragState & {
    /** Callback to be be invoked on drag end. */
    dragEnd: (event: MouseTouchOrPointerEvent) => void;
    /** Callback to be be invoked on drag move. */
    dragMove: (event: MouseTouchOrPointerEvent) => void;
    /** Callback to be be invoked on drag start. */
    dragStart: (event: MouseTouchOrPointerEvent) => void;
};
/** Hook for dragging, returns a `UseDrag` object. */
export default function useDrag({ resetOnStart, onDragEnd, onDragMove, onDragStart, x, y, dx, dy, }?: UseDragOptions | undefined): UseDrag;
export {};
//# sourceMappingURL=useDrag.d.ts.map