import React from 'react';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import Drag, { HandlerArgs as DragArgs } from '@vx/drag/lib/Drag';

import BrushHandle from './BrushHandle';
import BrushCorner from './BrushCorner';
import BrushSelection from './BrushSelection';
import { MarginShape, Point, BrushShape, ResizeTriggerAreas, PartialBrushStartEnd } from './types';

const BRUSH_OVERLAY_STYLES = { cursor: 'crosshair' };

type MouseHandlerEvent =
  | React.MouseEvent<SVGRectElement, MouseEvent>
  | React.TouchEvent<SVGRectElement>;

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
  onMouseLeave?: (event: MouseHandlerEvent) => void;
  onMouseUp?: (event: MouseHandlerEvent) => void;
  onMouseMove?: (event: MouseHandlerEvent) => void;
  onClick?: (event: MouseHandlerEvent) => void;
  clickSensitivity: number;
  disableDraggingSelection: boolean;
  resetOnEnd?: boolean;
};

export type BaseBrushState = BrushShape & {
  activeHandle: ResizeTriggerAreas | null;
  isBrushing: boolean;
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
    const marginLeft = inheritedMargin && inheritedMargin.left ? inheritedMargin.left : 0;
    const marginTop = inheritedMargin && inheritedMargin.top ? inheritedMargin.top : 0;
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
    }));
  };

  handleDragMove = (drag: DragArgs) => {
    const { left, top, inheritedMargin } = this.props;
    if (!drag.isDragging) return;
    const marginLeft = (inheritedMargin && inheritedMargin.left) || 0;
    const marginTop = (inheritedMargin && inheritedMargin.top) || 0;
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
    }));
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
    } = this.props;

    const handles = this.handles();
    const corners = this.corners();
    const width = this.getBrushWidth();
    const height = this.getBrushHeight();
    const resizeTriggerAreaSet = new Set(resizeTriggerAreas);

    return (
      <Group className="vx-brush" top={top} left={left}>
        {/* overlay */}
        <Drag
          width={stageWidth}
          height={stageHeight}
          resetOnStart
          onDragStart={this.handleDragStart}
          onDragMove={this.handleDragMove}
          onDragEnd={this.handleDragEnd}
        >
          {({ dragStart, isDragging, dragMove, dragEnd }) => (
            <Bar
              className="vx-brush-overlay"
              fill="transparent"
              x={0}
              y={0}
              width={stageWidth}
              height={stageHeight}
              onDoubleClick={() => this.reset()}
              onClick={(event: MouseHandlerEvent) => {
                const duration = this.mouseUpTime - this.mouseDownTime;
                if (onClick && duration < clickSensitivity) onClick(event);
              }}
              onMouseDown={(event: MouseHandlerEvent) => {
                this.mouseDownTime = Date.now();
                dragStart(event);
              }}
              onMouseLeave={(event: MouseHandlerEvent) => {
                if (onMouseLeave) onMouseLeave(event);
              }}
              onMouseMove={(event: MouseHandlerEvent) => {
                if (!isDragging && onMouseMove) onMouseMove(event);
                if (isDragging) dragMove(event);
              }}
              onMouseUp={(event: MouseHandlerEvent) => {
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
            onClick={onClick}
            selectedBoxStyle={selectedBoxStyle}
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
