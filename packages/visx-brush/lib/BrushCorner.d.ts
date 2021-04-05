import React from 'react';
import { HandlerArgs as DragArgs } from '@visx/drag/lib/Drag';
import { BaseBrushState as BrushState, UpdateBrush } from './BaseBrush';
import { ResizeTriggerAreas } from './types';
export declare type BrushCornerProps = {
    stageWidth: number;
    stageHeight: number;
    brush: BrushState;
    updateBrush: (update: UpdateBrush) => void;
    onBrushEnd?: (brush: BrushState) => void;
    type: ResizeTriggerAreas;
    style?: React.CSSProperties;
    corner: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
};
export declare type BrushCornerState = {};
export default class BrushCorner extends React.Component<BrushCornerProps, BrushCornerState> {
    static defaultProps: {
        style: {};
    };
    cornerDragMove: (drag: DragArgs) => void;
    cornerDragEnd: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=BrushCorner.d.ts.map