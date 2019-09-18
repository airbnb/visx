import { localPoint } from '@vx/event';
import React from 'react';

export type DragProps = {
  /** Children render function which is passed the state of dragging and callbacks for drag start/end/move. */
  children: (args: ChildrenArgs) => React.ReactNode;
  /** Width of the drag container. */
  width: number;
  /** Height of the drag container. */
  height: number;
  /** Whether to render an invisible rect below children to capture the drag area as defined by width and height. */
  captureDragArea?: boolean;
  /** Whether to reset drag state upon the start of a new drag. */
  resetOnStart?: boolean;
  /** Optional callback invoked upon drag end. */
  onDragEnd?: (args: HandlerArgs) => void;
  /** Optional callback invoked upon drag movement. */
  onDragMove?: (args: HandlerArgs) => void;
  /** Optional callback invoked upon drag start. */
  onDragStart?: (args: HandlerArgs) => void;
};

type DragState = {
  x: number | undefined;
  y: number | undefined;
  dx: number;
  dy: number;
  isDragging: boolean;
};

type HandlerArgs = DragState & { event: React.MouseEvent };

type ChildrenArgs = DragState & {
  dragEnd: (event: React.MouseEvent) => void;
  dragMove: (event: React.MouseEvent) => void;
  dragStart: (event: React.MouseEvent) => void;
};

export default class Drag extends React.Component<DragProps, DragState> {
  static defaultProps = {
    captureDragArea: true,
    resetOnStart: false,
  };

  state = {
    x: undefined,
    y: undefined,
    dx: 0,
    dy: 0,
    isDragging: false,
  };

  handleDragStart = (event: React.MouseEvent) => {
    const { onDragStart, resetOnStart } = this.props;
    const { dx, dy } = this.state;
    const point = localPoint(event);
    const nextState = {
      ...this.state,
      isDragging: true,
      dx: resetOnStart ? 0 : dx,
      dy: resetOnStart ? 0 : dy,
      x: resetOnStart ? point.x : -dx + point.x,
      y: resetOnStart ? point.y : -dy + point.y,
    };
    if (onDragStart) onDragStart({ ...nextState, event });
    this.setState(() => nextState);
  };

  handleDragMove = (event: React.MouseEvent) => {
    const { onDragMove } = this.props;
    const { x, y, isDragging } = this.state;
    if (!isDragging) return;
    const point = localPoint(event);
    const nextState = {
      ...this.state,
      isDragging: true,
      dx: -((x || 0) - point.x),
      dy: -((y || 0) - point.y),
    };
    if (onDragMove) onDragMove({ ...nextState, event });
    this.setState(() => nextState);
  };

  handleDragEnd = (event: React.MouseEvent) => {
    const { onDragEnd } = this.props;
    const nextState = {
      ...this.state,
      isDragging: false,
    };
    if (onDragEnd) onDragEnd({ ...nextState, event });
    this.setState(() => nextState);
  };

  render() {
    const { x, y, dx, dy, isDragging } = this.state;
    const { children, width, height, captureDragArea } = this.props;
    return (
      <>
        {isDragging && captureDragArea && (
          <rect
            width={width}
            height={height}
            onMouseMove={this.handleDragMove}
            onMouseUp={this.handleDragEnd}
            fill="transparent"
          />
        )}
        {children({
          x,
          y,
          dx,
          dy,
          isDragging,
          dragEnd: this.handleDragEnd,
          dragMove: this.handleDragMove,
          dragStart: this.handleDragStart,
        })}
      </>
    );
  }
}
