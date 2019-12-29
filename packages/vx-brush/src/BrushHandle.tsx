/* eslint react/jsx-handler-names: 0 */
import React from 'react';
import Drag, { HandlerArgs as DragArgs } from '@vx/drag/lib/Drag';
import { BaseBrushState as BrushState, UpdateBrush } from './BaseBrush';
import { ResizeTriggerAreas } from './types';

export type BrushHandleProps = {
  stageWidth: number;
  stageHeight: number;
  brush: BrushState;
  updateBrush: (update: UpdateBrush) => void;
  onBrushEnd?: (brush: BrushState) => void;
  type: ResizeTriggerAreas;
  handle: { x: number; y: number; width: number; height: number };
};

/** BrushHandle's are placed along the bounds of the brush and handle Drag events which update the passed brush. */
export default class BrushHandle extends React.Component<BrushHandleProps> {
  handleDragMove = (drag: DragArgs) => {
    const { updateBrush, type } = this.props;
    if (!drag.isDragging) return;

    updateBrush((prevBrush: BrushState) => {
      const { start, end } = prevBrush;
      let move = 0;
      const xMax = Math.max(start.x, end.x);
      const xMin = Math.min(start.x, end.x);
      const yMax = Math.max(start.y, end.y);
      const yMin = Math.min(start.y, end.y);
      switch (type) {
        case 'right':
          move = xMax + drag.dx;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.max(Math.min(move, start.x), prevBrush.bounds.x0),
              x1: Math.min(Math.max(move, start.x), prevBrush.bounds.x1),
            },
          };
        case 'left':
          move = xMin + drag.dx;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.min(move, end.x),
              x1: Math.max(move, end.x),
            },
          };
        case 'bottom':
          move = yMax + drag.dy;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              y0: Math.min(move, start.y),
              y1: Math.max(move, start.y),
            },
          };
        case 'top':
          move = yMin + drag.dy;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              y0: Math.min(move, end.y),
              y1: Math.max(move, end.y),
            },
          };
        default:
          return prevBrush;
      }
    });
  };

  handleDragEnd = () => {
    const { updateBrush, onBrushEnd } = this.props;
    updateBrush((prevBrush: BrushState) => {
      const { start, end, extent } = prevBrush;
      start.x = Math.min(extent.x0, extent.x1);
      start.y = Math.min(extent.y0, extent.y0);
      end.x = Math.max(extent.x0, extent.x1);
      end.y = Math.max(extent.y0, extent.y1);
      const nextBrush: BrushState = {
        ...prevBrush,
        start,
        end,
        activeHandle: null,
        isBrushing: false,
        extent: {
          x0: Math.min(start.x, end.x),
          x1: Math.max(start.x, end.x),
          y0: Math.min(start.y, end.y),
          y1: Math.max(start.y, end.y),
        },
      };
      if (onBrushEnd) {
        onBrushEnd(nextBrush);
      }

      return nextBrush;
    });
  };

  render() {
    const { stageWidth, stageHeight, brush, type, handle } = this.props;
    const { x, y, width, height } = handle;
    const cursor = type === 'right' || type === 'left' ? 'ew-resize' : 'ns-resize';

    return (
      <Drag
        width={stageWidth}
        height={stageHeight}
        onDragMove={this.handleDragMove}
        onDragEnd={this.handleDragEnd}
        resetOnStart
      >
        {({ dragStart, dragEnd, dragMove, isDragging }) => (
          <g>
            {/** capture mouse events while dragging */}
            {isDragging && (
              <rect
                fill="transparent"
                width={stageWidth}
                height={stageHeight}
                style={{ cursor }}
                onMouseMove={dragMove}
                onMouseUp={dragEnd}
                onMouseLeave={dragEnd}
              />
            )}
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill="transparent"
              className={`vx-brush-handle-${type}`}
              onMouseDown={dragStart}
              onMouseMove={dragMove}
              onMouseUp={dragEnd}
              style={{
                cursor,
                pointerEvents: !!brush.activeHandle || !!brush.isBrushing ? 'none' : 'all',
              }}
            />
          </g>
        )}
      </Drag>
    );
  }
}
