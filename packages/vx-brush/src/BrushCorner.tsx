/* eslint react/jsx-handler-names: 0 */
import React, { SVGProps } from 'react';
// @ts-ignore
import { Drag } from '@vx/drag';
import { GeneralStyleShape } from './types';
import { BaseBrushState as BrushState } from './BaseBrush';

export type BrushCornerProps = SVGProps<any> & {
  stageWidth: number;
  stageHeight: number;
  brush: BrushState;
  updateBrush: Function;
  onBrushEnd?: Function;
  type: string;
  style?: GeneralStyleShape;
};

export type BrushCornerState = {};

export default class BrushCorner extends React.Component<BrushCornerProps, BrushCornerState> {
  static defaultProps = {
    style: {},
  };

  constructor(props: BrushCornerProps) {
    super(props);
    this.cornerDragMove = this.cornerDragMove.bind(this);
    this.cornerDragEnd = this.cornerDragEnd.bind(this);
  }

  cornerDragMove(drag: any) {
    const { updateBrush, type } = this.props;
    if (!drag.isDragging) return;
    updateBrush((prevBrush: BrushState) => {
      const { start, end } = prevBrush;

      const xMax = Math.max(start.x, end.x);
      const xMin = Math.min(start.x, end.x);
      const yMax = Math.max(start.y, end.y);
      const yMin = Math.min(start.y, end.y);

      let moveX = 0;
      let moveY = 0;
      let nextState = {};

      switch (type) {
        case 'topRight':
          moveX = xMax + drag.dx;
          moveY = yMin + drag.dy;
          nextState = {
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
          break;
        case 'topLeft':
          moveX = xMin + drag.dx;
          moveY = yMin + drag.dy;
          nextState = {
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
          break;
        case 'bottomLeft':
          moveX = xMin + drag.dx;
          moveY = yMax + drag.dy;
          nextState = {
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
          break;
        case 'bottomRight':
          moveX = xMax + drag.dx;
          moveY = yMax + drag.dy;
          nextState = {
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
          break;
        default:
          break;
      }

      return nextState;
    });
  }

  cornerDragEnd() {
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
    const {
      type,
      brush,
      updateBrush,
      stageWidth,
      stageHeight,
      style: styleProp,
      onBrushEnd,
      ...restProps
    } = this.props;
    const cursor = type === 'topLeft' || type === 'bottomRight' ? 'nwse-resize' : 'nesw-resize';
    const pointerEvents = brush.activeHandle || brush.isBrushing ? 'none' : 'all';
    const style = {
      cursor,
      pointerEvents,
      ...styleProp,
    };

    return (
      <Drag
        width={stageWidth}
        height={stageHeight}
        onDragMove={this.cornerDragMove}
        onDragEnd={this.cornerDragEnd}
        resetOnStart
      >
        {(handle: any) => (
          <g>
            {handle.isDragging && (
              <rect
                fill="transparent"
                width={stageWidth}
                height={stageHeight}
                style={{ cursor: style.cursor }}
                onMouseMove={handle.dragMove}
                onMouseUp={handle.dragEnd}
              />
            )}
            <rect
              fill="transparent"
              onMouseDown={handle.dragStart}
              onMouseMove={handle.dragMove}
              onMouseUp={handle.dragEnd}
              className={`vx-brush-handle-${type}`}
              // @ts-ignore
              style={style}
              {...restProps}
            />
          </g>
        )}
      </Drag>
    );
  }
}
