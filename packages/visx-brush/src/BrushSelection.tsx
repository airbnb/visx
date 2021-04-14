/* eslint react/jsx-handler-names: 0 */
import React from 'react';
import Drag, { HandlerArgs as DragArgs } from '@visx/drag/lib/Drag';
import { BaseBrushState as BrushState, UpdateBrush } from './BaseBrush';

const DRAGGING_OVERLAY_STYLES = { cursor: 'move' };

type PointerHandler = (event: React.PointerEvent<SVGRectElement>) => void;

export type BrushSelectionProps = {
  width: number;
  height: number;
  stageWidth: number;
  stageHeight: number;
  brush: BrushState;
  updateBrush: (update: UpdateBrush) => void;
  onMoveSelectionChange?: (value: boolean) => void;
  onBrushEnd?: (brush: BrushState) => void;
  disableDraggingSelection: boolean;
  onMouseLeave: PointerHandler;
  onMouseMove: PointerHandler;
  onMouseUp: PointerHandler;
  onClick: PointerHandler;
  selectedBoxStyle: React.SVGProps<SVGRectElement>;
  isUseWindowMoveEvents?: boolean;
  isDragInProgress?: boolean;
};

export default class BrushSelection extends React.Component<
  BrushSelectionProps & Omit<React.SVGProps<SVGRectElement>, keyof BrushSelectionProps>
> {
  static defaultProps = {
    onMouseLeave: null,
    onMouseUp: null,
    onMouseMove: null,
    onClick: null,
  };

  selectionDragStart = () => {
    const { onMoveSelectionChange } = this.props;

    if (onMoveSelectionChange) {
      onMoveSelectionChange(true);
    }
  };

  selectionDragMove = (drag: DragArgs) => {
    const { updateBrush, onMoveSelectionChange } = this.props;
    updateBrush((prevBrush: BrushState) => {
      const { x: x0, y: y0 } = prevBrush.start;
      const { x: x1, y: y1 } = prevBrush.end;
      const validDx =
        drag.dx > 0
          ? Math.min(drag.dx, prevBrush.bounds.x1 - x1)
          : Math.max(drag.dx, prevBrush.bounds.x0 - x0);

      const validDy =
        drag.dy > 0
          ? Math.min(drag.dy, prevBrush.bounds.y1 - y1)
          : Math.max(drag.dy, prevBrush.bounds.y0 - y0);

      return {
        ...prevBrush,
        isBrushing: true,
        extent: {
          ...prevBrush.extent,
          x0: x0 + validDx,
          x1: x1 + validDx,
          y0: y0 + validDy,
          y1: y1 + validDy,
        },
      };
    });
    if (onMoveSelectionChange) {
      onMoveSelectionChange(true);
    }
  };

  selectionDragEnd = () => {
    const { updateBrush, onBrushEnd, onMoveSelectionChange } = this.props;
    updateBrush((prevBrush: BrushState) => {
      const nextBrush = {
        ...prevBrush,
        isBrushing: false,
        start: {
          ...prevBrush.start,
          x: Math.min(prevBrush.extent.x0, prevBrush.extent.x1),
          y: Math.min(prevBrush.extent.y0, prevBrush.extent.y1),
        },
        end: {
          ...prevBrush.end,
          x: Math.max(prevBrush.extent.x0, prevBrush.extent.x1),
          y: Math.max(prevBrush.extent.y0, prevBrush.extent.y1),
        },
      };
      if (onBrushEnd) {
        onBrushEnd(nextBrush);
      }
      return nextBrush;
    });
    if (onMoveSelectionChange) {
      onMoveSelectionChange(false);
    }
  };

  render() {
    const {
      width,
      height,
      stageWidth,
      stageHeight,
      brush,
      disableDraggingSelection,
      onMouseLeave,
      onMouseMove,
      onMouseUp,
      onClick,
      selectedBoxStyle,
      isUseWindowMoveEvents,
      isDragInProgress,
    } = this.props;

    return (
      <Drag
        width={width}
        height={height}
        resetOnStart
        onDragStart={this.selectionDragStart}
        onDragMove={this.selectionDragMove}
        onDragEnd={this.selectionDragEnd}
        isDragging={isUseWindowMoveEvents ? isDragInProgress : undefined}
      >
        {({ isDragging, dragStart, dragEnd, dragMove }) => (
          <g>
            {isDragging && (
              <rect
                width={stageWidth}
                height={stageHeight}
                fill="transparent"
                onPointerUp={isUseWindowMoveEvents ? undefined : dragEnd}
                onPointerMove={dragMove}
                onPointerLeave={isUseWindowMoveEvents ? undefined : dragEnd}
                style={DRAGGING_OVERLAY_STYLES}
              />
            )}
            <rect
              x={Math.min(brush.extent.x0, brush.extent.x1)}
              y={Math.min(brush.extent.y0, brush.extent.y1)}
              width={width}
              height={height}
              className="visx-brush-selection"
              onPointerDown={disableDraggingSelection ? undefined : dragStart}
              onPointerLeave={event => {
                if (onMouseLeave) onMouseLeave(event);
              }}
              onPointerMove={event => {
                dragMove(event);
                if (onMouseMove) onMouseMove(event);
              }}
              onPointerUp={event => {
                if (!isUseWindowMoveEvents) {
                  dragEnd(event);
                }
                if (onMouseUp) onMouseUp(event);
              }}
              onClick={event => {
                if (onClick) onClick(event as React.PointerEvent<SVGRectElement>);
              }}
              style={{
                pointerEvents: brush.isBrushing || brush.activeHandle ? 'none' : 'all',
                cursor: disableDraggingSelection ? undefined : 'move',
              }}
              {...selectedBoxStyle}
            />
          </g>
        )}
      </Drag>
    );
  }
}
