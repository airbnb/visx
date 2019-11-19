/* eslint react/jsx-handler-names: 0 */
import React from 'react';
// @ts-ignore
import { Drag } from '@vx/drag';
import { BaseBrushState as BrushState } from './BaseBrush';

export type BrushSelectionProps = {
  width: number;
  height: number;
  stageWidth: number;
  stageHeight: number;
  brush: BrushState;
  updateBrush: Function;
  onBrushEnd?: Function;
  disableDraggingSelection: boolean;
  onMouseLeave: Function;
  onMouseMove: Function;
  onMouseUp: Function;
  onClick: Function;
};

export default class BrushSelection extends React.Component<BrushSelectionProps> {
  static defaultProps = {
    onMouseLeave: null,
    onMouseUp: null,
    onMouseMove: null,
    onClick: null,
  };

  constructor(props: BrushSelectionProps) {
    super(props);
    this.selectionDragMove = this.selectionDragMove.bind(this);
    this.selectionDragEnd = this.selectionDragEnd.bind(this);
  }

  selectionDragMove(drag: any) {
    const { updateBrush } = this.props;
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
  }

  selectionDragEnd() {
    const { updateBrush, onBrushEnd } = this.props;
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
  }

  render() {
    const {
      width,
      height,
      stageWidth,
      stageHeight,
      brush,
      updateBrush,
      disableDraggingSelection,
      onBrushEnd,
      onMouseLeave,
      onMouseMove,
      onMouseUp,
      onClick,
      ...restProps
    } = this.props;

    return (
      <Drag
        width={width}
        height={height}
        resetOnStart
        onDragMove={this.selectionDragMove}
        onDragEnd={this.selectionDragEnd}
      >
        {(selection: any) => (
          <g>
            {selection.isDragging && (
              <rect
                width={stageWidth}
                height={stageHeight}
                fill="transparent"
                onMouseUp={selection.dragEnd}
                onMouseMove={selection.dragMove}
                onMouseLeave={selection.dragEnd}
                style={{
                  cursor: 'move',
                }}
              />
            )}
            <rect
              x={Math.min(brush.extent.x0, brush.extent.x1)}
              y={Math.min(brush.extent.y0, brush.extent.y1)}
              width={width}
              height={height}
              className="vx-brush-selection"
              onMouseDown={disableDraggingSelection ? null : selection.dragStart}
              onMouseLeave={event => {
                if (onMouseLeave) onMouseLeave(event);
              }}
              onMouseMove={event => {
                selection.dragMove(event);
                if (onMouseMove) onMouseMove(event);
              }}
              onMouseUp={event => {
                selection.dragEnd(event);
                if (onMouseUp) onMouseUp(event);
              }}
              onClick={event => {
                if (onClick) onClick(event);
              }}
              // @ts-ignore
              style={{
                pointerEvents: brush.isBrushing || brush.activeHandle ? 'none' : 'all',
                cursor: disableDraggingSelection ? null : 'move',
              }}
              {...restProps}
            />
          </g>
        )}
      </Drag>
    );
  }
}
