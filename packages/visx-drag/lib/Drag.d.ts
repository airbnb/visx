import React from "react";
import { UseDrag, UseDragOptions, HandlerArgs as HandlerArgsType } from "./useDrag";
export declare type HandlerArgs = HandlerArgsType;
export declare type DragProps = UseDragOptions & {
    /** Children render function which is passed the state of dragging and callbacks for drag start/end/move. */
    children: (args: UseDrag) => React.ReactNode;
    /** Width of the drag container. */
    width: number;
    /** Height of the drag container. */
    height: number;
    /** Whether to render an invisible rect below children to capture the drag area as defined by width and height. */
    captureDragArea?: boolean;
};
export default function Drag({ captureDragArea, children, dx, dy, height, onDragEnd, onDragMove, onDragStart, resetOnStart, width, x, y, }: DragProps): JSX.Element;
//# sourceMappingURL=Drag.d.ts.map