/* eslint react/jsx-handler-names: 0 */
import React from 'react';
//@ts-ignore
import { Drag } from '@vx/drag';
import { DragShape } from './types';
import { BrushState } from './Brush';

export type BrushHandleProps = {
  stageWidth: number;
  stageHeight: number;
  brush: BrushState;
  updateBrush: Function;
  onBrushEnd?: Function;
  handle: DragShape;
  type: string;
};

export default class BrushHandle extends React.Component<BrushHandleProps> {
  constructor(props: BrushHandleProps) {
    super(props);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragMove(drag: any) {
    const { updateBrush, type } = this.props;
    if (!drag.isDragging) return;
    updateBrush((prevBrush: BrushState) => {
      const { start, end } = prevBrush;
      let nextState = {};
      let move = 0;
      const xMax = Math.max(start.x, end.x);
      const xMin = Math.min(start.x, end.x);
      const yMax = Math.max(start.y, end.y);
      const yMin = Math.min(start.y, end.y);
      switch (type) {
        case 'right':
          move = xMax + drag.dx;
          nextState = {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.max(Math.min(move, start.x), prevBrush.bounds.x0),
              x1: Math.min(Math.max(move, start.x), prevBrush.bounds.x1),
            },
          };
          break;
        case 'left':
          move = xMin + drag.dx;
          nextState = {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.min(move, end.x),
              x1: Math.max(move, end.x),
            },
          };
          break;
        case 'bottom':
          move = yMax + drag.dy;
          nextState = {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              y0: Math.min(move, start.y),
              y1: Math.max(move, start.y),
            },
          };
          break;
        case 'top':
          move = yMin + drag.dy;
          nextState = {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              y0: Math.min(move, end.y),
              y1: Math.max(move, end.y),
            },
          };
          break;
        default:
          break;
      }

      return nextState;
    });
  }

  handleDragEnd() {
    const { updateBrush, onBrushEnd } = this.props;
    updateBrush((prevBrush: BrushState) => {
      const { start, end, extent } = prevBrush;
      start.x = Math.min(extent.x0, extent.x1);
      start.y = Math.min(extent.y0, extent.y0);
      end.x = Math.max(extent.x0, extent.x1);
      end.y = Math.max(extent.y0, extent.y1);
      const nextBrush = {
        ...prevBrush,
        start,
        end,
        activeHandle: undefined,
        isBrushing: false,
        domain: {
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
  }

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
        {(drag: any) => (
          <g>
            {handle.isDragging && (
              <rect
                fill="transparent"
                width={stageWidth}
                height={stageHeight}
                style={{ cursor }}
                onMouseMove={drag.dragMove}
                onMouseUp={drag.dragEnd}
                onMouseLeave={drag.dragEnd}
              />
            )}
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill="transparent"
              className={`vx-brush-handle-${type}`}
              onMouseDown={drag.dragStart}
              onMouseMove={drag.dragMove}
              onMouseUp={drag.dragEnd}
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
