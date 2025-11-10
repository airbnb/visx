/* eslint react/jsx-handler-names: 0 */
import { Component } from 'react';
import type { CSSProperties } from 'react';
import type { HandlerArgs as DragArgs } from '@visx/drag';
import { Drag } from '@visx/drag';
import type { BaseBrushState as BrushState, UpdateBrush } from './BaseBrush';
import type { ResizeTriggerAreas } from './types';

export type BrushCornerProps = {
  stageWidth: number;
  stageHeight: number;
  brush: BrushState;
  updateBrush: (update: UpdateBrush) => void;
  onBrushEnd?: (brush: BrushState) => void;
  type: ResizeTriggerAreas;
  style?: CSSProperties;
  corner: { x: number; y: number; width: number; height: number };
};

export type BrushCornerState = {};

export default class BrushCorner extends Component<BrushCornerProps, BrushCornerState> {
  static defaultProps = {
    style: {},
  };

  cornerDragMove = (drag: DragArgs) => {
    const { updateBrush, type } = this.props;
    if (!drag.isDragging) return;

    updateBrush((prevBrush: Readonly<BrushState>) => {
      const { start, end } = prevBrush;

      const xMax = Math.max(start.x, end.x);
      const xMin = Math.min(start.x, end.x);
      const yMax = Math.max(start.y, end.y);
      const yMin = Math.min(start.y, end.y);

      let moveX = 0;
      let moveY = 0;

      switch (type) {
        case 'topRight':
          moveX = xMax + drag.dx;
          moveY = yMin + drag.dy;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
              x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
              y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
              y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1),
            },
          };

        case 'topLeft':
          moveX = xMin + drag.dx;
          moveY = yMin + drag.dy;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
              x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
              y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
              y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1),
            },
          };

        case 'bottomLeft':
          moveX = xMin + drag.dx;
          moveY = yMax + drag.dy;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
              x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
              y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
              y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1),
            },
          };
        case 'bottomRight':
          moveX = xMax + drag.dx;
          moveY = yMax + drag.dy;
          return {
            ...prevBrush,
            activeHandle: type,
            extent: {
              ...prevBrush.extent,
              x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
              x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
              y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
              y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1),
            },
          };
        // BrushCorner skips edges use BrushHandle for those
        case 'top':
        case 'right':
        case 'bottom':
        case 'left':
        default:
          return prevBrush;
      }
    });
  };

  cornerDragEnd = () => {
    const { updateBrush, onBrushEnd } = this.props;

    updateBrush((prevBrush: Readonly<BrushState>) => {
      const { start, end, extent } = prevBrush;
      start.x = Math.min(extent.x0, extent.x1);
      start.y = Math.min(extent.y0, extent.y0);
      end.x = Math.max(extent.x0, extent.x1);
      end.y = Math.max(extent.y0, extent.y1);
      const nextBrush = {
        ...prevBrush,
        start,
        end,
        activeHandle: null,
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
  };

  render() {
    const { type, brush, stageWidth, stageHeight, style: styleProp, corner } = this.props;
    const cursor =
      styleProp?.cursor ||
      (type === 'topLeft' || type === 'bottomRight' ? 'nwse-resize' : 'nesw-resize');
    const pointerEvents = brush.activeHandle || brush.isBrushing ? 'none' : 'all';

    return (
      <Drag
        width={stageWidth}
        height={stageHeight}
        onDragMove={this.cornerDragMove}
        onDragEnd={this.cornerDragEnd}
        resetOnStart
      >
        {({ dragMove, dragEnd, dragStart, isDragging }) => (
          <g>
            {isDragging && (
              <rect
                fill="transparent"
                width={stageWidth}
                height={stageHeight}
                style={{ cursor }}
                onPointerMove={dragMove}
                onPointerUp={dragEnd}
              />
            )}
            <rect
              fill="transparent"
              onPointerDown={dragStart}
              onPointerMove={dragMove}
              onPointerUp={dragEnd}
              className={`visx-brush-corner-${type}`}
              style={{ cursor, pointerEvents, ...styleProp }}
              {...corner}
            />
          </g>
        )}
      </Drag>
    );
  }
}
