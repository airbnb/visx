import React from "react";
import { HandlerArgs as DragArgs } from "@visx/drag/lib/Drag";
import { BaseBrushState as BrushState, UpdateBrush } from "./BaseBrush";
import { ResizeTriggerAreas } from "./types";
export declare type BrushHandleProps = {
    stageWidth: number;
    stageHeight: number;
    brush: BrushState;
    updateBrush: (update: UpdateBrush) => void;
    onBrushEnd?: (brush: BrushState) => void;
    type: ResizeTriggerAreas;
    handle: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
};
/** BrushHandle's are placed along the bounds of the brush and handle Drag events which update the passed brush. */
export default class BrushHandle extends React.Component<BrushHandleProps> {
    handleDragMove: (drag: DragArgs) => void;
    handleDragEnd: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=BrushHandle.d.ts.map