import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { localPoint } from '@visx/event';
import Drag, { HandlerArgs as DragArgs } from '@visx/drag/lib/Drag';

import BrushHandle from './BrushHandle';
import BrushCorner from './BrushCorner';
import BrushSelection from './BrushSelection';
import {
  MarginShape,
  Point,
  BrushShape,
  ResizeTriggerAreas,
  PartialBrushStartEnd,
  BrushingType,
} from './types';

const BRUSH_OVERLAY_STYLES = { cursor: 'crosshair' };

type PointerHandlerEvent = React.PointerEvent<SVGRectElement>;

export type BaseBrushProps = {
  brushDirection?: 'horizontal' | 'vertical' | 'both';
  initialBrushPosition?: PartialBrushStartEnd;
  width: number;
  height: number;
  left: number;
  top: number;
  inheritedMargin?: MarginShape;
  onChange?: (state: BaseBrushState) => void;
  handleSize: number;
  resizeTriggerAreas?: ResizeTriggerAreas[];
  onBrushStart?: (start: BaseBrushState['start']) => void;
  onBrushEnd?: (state: BaseBrushState) => void;
  selectedBoxStyle: React.SVGProps<SVGRectElement>;
  onMouseLeave?: (event: PointerHandlerEvent) => void;
  onMouseUp?: (event: PointerHandlerEvent) => void;
  onMouseMove?: (event: PointerHandlerEvent) => void;
  onClick?: (event: PointerHandlerEvent) => void;
  clickSensitivity: number;
  disableDraggingSelection: boolean;
  resetOnEnd?: boolean;
  useWindowMoveEvents?: boolean;
};

export type BaseBrushState = BrushShape & {
  activeHandle: ResizeTriggerAreas | null;
  isBrushing: boolean;
  brushingType?: BrushingType;
};

export type UpdateBrush =
  | BaseBrushState
  | ((prevState: Readonly<BaseBrushState>, props: Readonly<BaseBrushProps>) => BaseBrushState);

export default class BaseBrush extends React.Component<BaseBrushProps, BaseBrushState> {
  private constructor(props: BaseBrushProps) {
    super(props);
    const { initialBrushPosition } = props;
    const extent = initialBrushPosition
      ? this.getExtent(initialBrushPosition.start, initialBrushPosition.end)
      : {
          x0: -1,
          x1: -1,
          y0: -1,
          y1: -1,
        };
    this.state = {
      start: { x: Math.max(0, extent.x0), y: Math.max(0, extent.y0) },
      end: { x: Math.max(0, extent.x1), y: Math.max(0, extent.y1) },
      extent,
      bounds: {
        x0: 0,
        x1: this.props.width,
        y0: 0,
        y1: this.props.height,
      },
      isBrushing: false,
      brushingType: undefined,
      activeHandle: null,
    };
  }

  private mouseUpTime: number = 0;
  private mouseDownTime: number = 0;

  static defaultProps = {
    brushDirection: 'both',
    inheritedMargin: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    onChange: null,
    handleSize: 4,
    resizeTriggerAreas: ['left', 'right'],
    onBrushStart: null,
    onBrushEnd: null,
    onMouseLeave: null,
    onMouseUp: null,
    onMouseMove: null,
    onClick: null,
    disableDraggingSelection: false,
    clickSensitivity: 200,
    resetOnEnd: false,
    initialBrushPosition: null,
    useWindowMoveEvents: false,
  };

  componentDidUpdate(prevProps: BaseBrushProps) {
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(() => ({
        bounds: {
          x0: 0,
          x1: this.props.width,
          y0: 0,
          y1: this.props.height,
        },
      }));
    }
  }

  componentDidMount() {
    if (this.props.useWindowMoveEvents) {
      window.addEventListener('mouseup', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  componentWillUnmount() {
    if (this.props.useWindowMoveEvents) {
      window.removeEventListener('mouseup', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseUp = () => {
    const { useWindowMoveEvents } = this.props;
    const { brushingType } = this.state;

    if (
      useWindowMoveEvents &&
      ['top', 'bottom', 'left', 'right', 'select', 'move'].includes(brushingType ?? '')
    ) {
      this.updateBrush((prevBrush: BaseBrushState) => {
        const { start, end, extent } = prevBrush;

        start.x = Math.min(extent.x0, extent.x1);
        start.y = Math.min(extent.y0, extent.y0);
        end.x = Math.max(extent.x0, extent.x1);
        end.y = Math.max(extent.y0, extent.y1);

        return {
          ...prevBrush,
          activeHandle: null,
          isBrushing: false,
          brushingType: undefined,
        };
      });
    }
  };

  handleMouseMove = (event: MouseEvent) => {
    const { useWindowMoveEvents, left, top, inheritedMargin } = this.props;
    const { brushingType, isBrushing, bounds, start, end } = this.state;

    if (!useWindowMoveEvents || !isBrushing) return;

    const marginLeft = inheritedMargin?.left || 0;
    const marginTop = inheritedMargin?.top || 0;
    const point = localPoint(event);
    const calculatedX = Math.min(
      Math.max((point?.x || 0) - left - marginLeft, bounds.x0),
      bounds.x1,
    );
    const calculatedY = Math.min(Math.max((point?.y || 0) - top - marginTop, bounds.y0), bounds.y1);

    if (['left', 'top'].includes(brushingType ?? '')) {
      const newStart = { x: calculatedX, y: calculatedY };
      this.updateBrush((prevBrush: BaseBrushState) => {
        const extent = this.getExtent(newStart, end);
        return {
          ...prevBrush,
          start: newStart,
          end,
          extent,
        };
      });
      return;
    }

    if (['select', 'right', 'bottom'].includes(brushingType ?? '')) {
      const newEnd = { x: calculatedX, y: calculatedY };
      this.updateBrush((prevBrush: BaseBrushState) => {
        const extent = this.getExtent(start, newEnd);
        return {
          ...prevBrush,
          end: newEnd,
          extent,
        };
      });
      return;
    }

    if (brushingType === 'move') {
      let newStart = start;
      const newEnd = { x: calculatedX, y: calculatedY };

      const xDiff = calculatedX - end.x;
      const yDiff = calculatedY - end.y;

      newStart = {
        x: newStart.x + xDiff,
        y: newStart.y + yDiff,
      };

      if (newStart.x < bounds.x0) {
        newEnd.x += bounds.x0 - newStart.x;
        newStart.x = bounds.x0;
      }
      if (newStart.y < bounds.y0) {
        newEnd.y += bounds.y0 - newStart.y;
        newStart.y = bounds.y0;
      }
      if (newEnd.x > bounds.x1) {
        newStart.x -= newEnd.x - bounds.x1;
        newEnd.x = bounds.x1;
      }
      if (newEnd.y > bounds.y1) {
        newStart.y -= newEnd.y - bounds.y1;
        newEnd.y = bounds.y1;
      }
      this.updateBrush((prevBrush: BaseBrushState) => {
        const extent = this.getExtent(newStart, newEnd);
        return {
          ...prevBrush,
          start: newStart,
          end: newEnd,
          extent,
        };
      });
    }
  };

  getExtent = (start: Partial<Point>, end: Partial<Point>) => {
    const { brushDirection, width, height } = this.props;
    const x0 = brushDirection === 'vertical' ? 0 : Math.min(start.x || 0, end.x || 0);
    const x1 = brushDirection === 'vertical' ? width : Math.max(start.x || 0, end.x || 0);
    const y0 = brushDirection === 'horizontal' ? 0 : Math.min(start.y || 0, end.y || 0);
    const y1 = brushDirection === 'horizontal' ? height : Math.max(start.y || 0, end.y || 0);

    return {
      x0,
      x1,
      y0,
      y1,
    };
  };

  handleDragStart = (draw: DragArgs) => {
    const { onBrushStart, left, top, inheritedMargin } = this.props;
    const marginLeft = inheritedMargin?.left ? inheritedMargin.left : 0;
    const marginTop = inheritedMargin?.top ? inheritedMargin.top : 0;
    const start = {
      x: (draw.x || 0) + draw.dx - left - marginLeft,
      y: (draw.y || 0) + draw.dy - top - marginTop,
    };
    const end = { ...start };

    if (onBrushStart) {
      onBrushStart(start);
    }

    this.updateBrush((prevBrush: BaseBrushState) => ({
      ...prevBrush,
      start,
      end,
      extent: {
        x0: -1,
        x1: -1,
        y0: -1,
        y1: -1,
      },
      isBrushing: true,
      brushingType: 'select',
    }));
  };

  handleDragMove = (drag: DragArgs) => {
    const { left, top, inheritedMargin } = this.props;
    if (!drag.isDragging) return;
    const marginLeft = inheritedMargin?.left || 0;
    const marginTop = inheritedMargin?.top || 0;
    const end = {
      x: (drag.x || 0) + drag.dx - left - marginLeft,
      y: (drag.y || 0) + drag.dy - top - marginTop,
    };
    this.updateBrush((prevBrush: BaseBrushState) => {
      const { start } = prevBrush;
      const extent = this.getExtent(start, end);
      return {
        ...prevBrush,
        end,
        extent,
      };
    });
  };

  handleDragEnd = () => {
    const { onBrushEnd, resetOnEnd } = this.props;
    this.updateBrush((prevBrush: BaseBrushState) => {
      const { extent } = prevBrush;
      const newState = {
        ...prevBrush,
        start: {
          x: extent.x0,
          y: extent.y0,
        },
        end: {
          x: extent.x1,
          y: extent.y1,
        },
        isBrushing: false,
        brushingType: undefined,
        activeHandle: null,
      };

      if (onBrushEnd) {
        onBrushEnd(newState);
      }

      if (resetOnEnd) {
        this.reset();
      }

      return newState;
    });
  };

  getBrushWidth = () => {
    const { extent } = this.state;
    const { x0, x1 } = extent;

    return Math.max(Math.max(x0, x1) - Math.min(x0, x1), 0);
  };

  getBrushHeight = () => {
    const { extent } = this.state;
    const { y1, y0 } = extent;

    return Math.max(Math.max(y0, y1) - Math.min(y0, y1), 0);
  };

  handles = (): Partial<
    {
      [key in ResizeTriggerAreas]: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
    }
  > => {
    const { handleSize } = this.props;
    const { extent } = this.state;
    const { x0, x1, y0, y1 } = extent;
    const offset = handleSize / 2;
    const width = this.getBrushWidth();
    const height = this.getBrushHeight();

    return {
      top: {
        x: x0 - offset,
        y: y0 - offset,
        height: handleSize,
        width: width + handleSize,
      },
      bottom: {
        x: x0 - offset,
        y: y1 - offset,
        height: handleSize,
        width: width + handleSize,
      },
      right: {
        x: x1 - offset,
        y: y0 - offset,
        height: height + handleSize,
        width: handleSize,
      },
      left: {
        x: x0 - offset,
        y: y0 - offset,
        height: height + handleSize,
        width: handleSize,
      },
    };
  };

  corners = (): Partial<
    {
      [key in ResizeTriggerAreas]: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
    }
  > => {
    const { handleSize } = this.props;
    const { extent } = this.state;
    const { x0, x1, y0, y1 } = extent;
    const offset = handleSize / 2;
    const width = handleSize;
    const height = handleSize;

    return {
      topLeft: {
        x: Math.min(x0, x1) - offset,
        y: Math.min(y0, y1) - offset,
        width,
        height,
      },
      topRight: {
        x: Math.max(x0, x1) - offset,
        y: Math.min(y0, y1) - offset,
        width,
        height,
      },
      bottomLeft: {
        x: Math.min(x0, x1) - offset,
        y: Math.max(y0, y1) - offset,
        width,
        height,
      },
      bottomRight: {
        x: Math.max(x0, x1) - offset,
        y: Math.max(y0, y1) - offset,
        width,
        height,
      },
    };
  };

  updateBrush = (updater: UpdateBrush) => {
    const { onChange } = this.props;
    this.setState(updater, () => {
      if (onChange) {
        onChange(this.state);
      }
    });
  };

  reset = () => {
    const { width, height } = this.props;
    this.updateBrush(() => ({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      extent: {
        x0: -1,
        x1: -1,
        y0: -1,
        y1: -1,
      },
      bounds: {
        x0: 0,
        x1: width,
        y0: 0,
        y1: height,
      },
      isBrushing: false,
      activeHandle: null,
      brushingType: undefined,
    }));
  };

  handleBrushingTypeChange = (type?: BrushingType) => {
    this.updateBrush((prevBrush: BaseBrushState) => {
      return {
        ...prevBrush,
        brushingType: type,
        isBrushing: type !== undefined,
      };
    });
  };

  render() {
    const { start, end } = this.state;
    const {
      top,
      left,
      width: stageWidth,
      height: stageHeight,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      onBrushEnd,
      onClick,
      resizeTriggerAreas,
      selectedBoxStyle,
      disableDraggingSelection,
      clickSensitivity,
      useWindowMoveEvents,
    } = this.props;

    const { brushingType } = this.state;

    const handles = this.handles();
    const corners = this.corners();
    const width = this.getBrushWidth();
    const height = this.getBrushHeight();
    const resizeTriggerAreaSet = new Set(resizeTriggerAreas);

    return (
      <Group className="visx-brush" top={top} left={left}>
        {/* overlay */}
        <Drag
          width={stageWidth}
          height={stageHeight}
          resetOnStart
          onDragStart={this.handleDragStart}
          onDragMove={this.handleDragMove}
          onDragEnd={this.handleDragEnd}
          isDragging={useWindowMoveEvents ? brushingType === 'select' : undefined}
        >
          {({ dragStart, isDragging, dragMove, dragEnd }) => (
            <Bar
              className="visx-brush-overlay"
              fill="transparent"
              x={0}
              y={0}
              width={stageWidth}
              height={stageHeight}
              onDoubleClick={() => this.reset()}
              onClick={(event: PointerHandlerEvent) => {
                const duration = this.mouseUpTime - this.mouseDownTime;
                if (onClick && duration < clickSensitivity) onClick(event);
              }}
              onPointerDown={(event: PointerHandlerEvent) => {
                this.mouseDownTime = Date.now();
                dragStart(event);
              }}
              onPointerLeave={(event: PointerHandlerEvent) => {
                if (onMouseLeave) onMouseLeave(event);
              }}
              onPointerMove={(event: PointerHandlerEvent) => {
                if (!isDragging && onMouseMove) onMouseMove(event);
                if (isDragging) dragMove(event);
              }}
              onPointerUp={(event: PointerHandlerEvent) => {
                this.mouseUpTime = Date.now();
                if (onMouseUp) onMouseUp(event);
                dragEnd(event);
              }}
              style={BRUSH_OVERLAY_STYLES}
            />
          )}
        </Drag>
        {/* selection */}
        {start && end && (
          <BrushSelection
            updateBrush={this.updateBrush}
            width={width}
            height={height}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            brush={{ ...this.state }}
            disableDraggingSelection={disableDraggingSelection}
            onBrushEnd={onBrushEnd}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMoveSelectionChange={this.handleBrushingTypeChange}
            onClick={onClick}
            selectedBoxStyle={selectedBoxStyle}
            useWindowMoveEvents={useWindowMoveEvents}
            isDragInProgress={useWindowMoveEvents ? brushingType === 'move' : undefined}
          />
        )}
        {/* handles */}
        {start &&
          end &&
          (Object.keys(handles) as ResizeTriggerAreas[])
            .filter(handleKey => resizeTriggerAreaSet.has(handleKey))
            .map(handleKey => {
              const handle = handles[handleKey];

              return (
                handle && (
                  <BrushHandle
                    key={`handle-${handleKey}`}
                    type={handleKey}
                    handle={handle}
                    stageWidth={stageWidth}
                    stageHeight={stageHeight}
                    updateBrush={this.updateBrush}
                    brush={this.state}
                    onBrushEnd={onBrushEnd}
                    useWindowMoveEvents={useWindowMoveEvents}
                    isDragInProgress={useWindowMoveEvents ? brushingType === handleKey : undefined}
                    onBrushHandleChange={this.handleBrushingTypeChange}
                  />
                )
              );
            })}
        {/* corners */}
        {start &&
          end &&
          (Object.keys(corners) as ResizeTriggerAreas[])
            .filter(cornerKey => resizeTriggerAreaSet.has(cornerKey))
            .map(cornerKey => {
              const corner = corners[cornerKey];

              return (
                corner && (
                  <BrushCorner
                    key={`corner-${cornerKey}`}
                    type={cornerKey}
                    brush={this.state}
                    updateBrush={this.updateBrush}
                    stageWidth={stageWidth}
                    stageHeight={stageHeight}
                    corner={corner}
                    onBrushEnd={onBrushEnd}
                  />
                )
              );
            })}
      </Group>
    );
  }
}
