import React from "react";
import { HandlerArgs as DragArgs } from "@visx/drag/lib/Drag";
import { BaseBrushState as BrushState, UpdateBrush } from "./BaseBrush";
declare type MouseHandler = (event: React.MouseEvent<SVGRectElement, MouseEvent> | React.TouchEvent<SVGRectElement>) => void;
export declare type BrushSelectionProps = {
    width: number;
    height: number;
    stageWidth: number;
    stageHeight: number;
    brush: BrushState;
    updateBrush: (update: UpdateBrush) => void;
    onBrushEnd?: (brush: BrushState) => void;
    disableDraggingSelection: boolean;
    onMouseLeave: MouseHandler;
    onMouseMove: MouseHandler;
    onMouseUp: MouseHandler;
    onClick: MouseHandler;
    selectedBoxStyle: React.SVGProps<SVGRectElement>;
};
export default class BrushSelection extends React.Component<BrushSelectionProps & Omit<React.SVGProps<SVGRectElement>, keyof BrushSelectionProps>> {
    static defaultProps: {
        onMouseLeave: null;
        onMouseUp: null;
        onMouseMove: null;
        onClick: null;
    };
    selectionDragMove: (drag: DragArgs) => void;
    selectionDragEnd: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=BrushSelection.d.ts.map