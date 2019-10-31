import React from 'react';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
//@ts-ignore
import { Drag } from '@vx/drag';

import BrushHandle from './BrushHandle';
import BrushCorner from './BrushCorner';
import BrushSelection from './BrushSelection';
import { GeneralStyleShape, MarginShape, Point, BrushShape, ResizeTriggerAreas } from './types';

export type BaseBrushProps = {
  brushDirection?: 'horizontal' | 'vertical' | 'both';
  width: number;
  height: number;
  left: number;
  top: number;
  inheritedMargin?: MarginShape;
  onChange?: Function;
  handleSize: number;
  resizeTriggerAreas?: ResizeTriggerAreas;
  onBrushStart?: Function;
  onBrushEnd?: Function;
  selectedBoxStyle: GeneralStyleShape;
  onMouseLeave?: Function;
  onMouseUp?: Function;
  onMouseMove?: Function;
  onClick?: Function;
  clickSensitivity: number;
  disableDraggingSelection: boolean;
};

export type BaseBrushState = BrushShape & {
  activeHandle: any;
  isBrushing: boolean;
};

export default class BaseBrush extends React.Component<BaseBrushProps, BaseBrushState> {
  private mouseUpTime: any;
  private mouseDownTime: any;

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
  };

  constructor(props: BaseBrushProps) {
    super(props);
    const { width, height } = props;
    this.state = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      extent: {
        x0: 0,
        x1: 0,
        y0: 0,
        y1: 0,
      },
      bounds: {
        x0: 0,
        x1: width,
        y0: 0,
        y1: height,
      },
      isBrushing: false,
      activeHandle: null,
    };
    this.width = this.width.bind(this);
    this.height = this.height.bind(this);
    this.handles = this.handles.bind(this);
    this.corners = this.corners.bind(this);
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.getExtent = this.getExtent.bind(this);
    this.mouseUpTime = 0;
    this.mouseDownTime = 0;
  }

  componentWillReceiveProps(nextProps: BaseBrushProps) {
    //@ts-ignore
    if (['width', 'height'].some(prop => this.props[prop] !== nextProps[prop])) {
      this.setState(() => ({
        bounds: {
          x0: 0,
          x1: nextProps.width,
          y0: 0,
          y1: nextProps.height,
        },
      }));
    }
  }

  getExtent(start: Point, end: Point) {
    const { brushDirection, width, height } = this.props;
    const x0 = brushDirection === 'vertical' ? 0 : Math.min(start.x, end.x);
    const x1 = brushDirection === 'vertical' ? width : Math.max(start.x, end.x);
    const y0 = brushDirection === 'horizontal' ? 0 : Math.min(start.y, end.y);
    const y1 = brushDirection === 'horizontal' ? height : Math.max(start.y, end.y);

    return {
      x0,
      x1,
      y0,
      y1,
    };
  }

  handleDragStart(draw: any) {
    const { onBrushStart, left, top, inheritedMargin } = this.props;
    const marginLeft = inheritedMargin && inheritedMargin.left ? inheritedMargin.left : 0;
    const marginTop = inheritedMargin && inheritedMargin.top ? inheritedMargin.top : 0;
    const start = {
      x: draw.x + draw.dx - left - marginLeft,
      y: draw.y + draw.dy - top - marginTop,
    };
    const end = { ...start };

    if (onBrushStart) {
      onBrushStart(start);
    }

    this.update((prevBrush: BaseBrushState) => ({
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
  }

  handleDragMove(draw: any) {
    const { left, top, inheritedMargin } = this.props;
    if (!draw.isDragging) return;
    const marginLeft = inheritedMargin && inheritedMargin.left ? inheritedMargin.left : 0;
    const marginTop = inheritedMargin && inheritedMargin.top ? inheritedMargin.top : 0;
    const end = {
      x: draw.x + draw.dx - left - marginLeft,
      y: draw.y + draw.dy - top - marginTop,
    };
    this.update((prevBrush: BaseBrushState) => {
      const { start } = prevBrush;
      const extent = this.getExtent(start, end);

      return {
        ...prevBrush,
        end,
        extent,
      };
    });
  }

  handleDragEnd() {
    const { onBrushEnd } = this.props;
    this.update((prevBrush: BaseBrushState) => {
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
      };
      if (onBrushEnd) {
        onBrushEnd(newState);
      }

      return newState;
    });
  }

  width() {
    const { extent } = this.state;
    const { x0, x1 } = extent;

    return Math.max(Math.max(x0, x1) - Math.min(x0, x1), 0);
  }

  height() {
    const { extent } = this.state;
    const { y1, y0 } = extent;

    return Math.max(y1 - y0, 0);
  }

  handles(): {
    [index: string]: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  } {
    const { handleSize } = this.props;
    const { extent } = this.state;
    const { x0, x1, y0, y1 } = extent;
    const offset = handleSize / 2;
    const width = this.width();
    const height = this.height();

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
  }

  corners(): {
    [index: string]: {
      x: number;
      y: number;
    };
  } {
    const { handleSize } = this.props;
    const { extent } = this.state;
    const { x0, x1, y0, y1 } = extent;
    const offset = handleSize / 2;

    return {
      topLeft: {
        x: Math.min(x0, x1) - offset,
        y: Math.min(y0, y1) - offset,
      },
      topRight: {
        x: Math.max(x0, x1) - offset,
        y: Math.min(y0, y1) - offset,
      },
      bottomLeft: {
        x: Math.min(x0, x1) - offset,
        y: Math.max(y0, y1) - offset,
      },
      bottomRight: {
        x: Math.max(x0, x1) - offset,
        y: Math.max(y0, y1) - offset,
      },
    };
  }

  update(updater: any) {
    const { onChange } = this.props;
    this.setState(updater, () => {
      if (onChange) {
        onChange(this.state);
      }
    });
  }

  reset() {
    const { width, height } = this.props;
    this.update(() => ({
      start: undefined,
      end: undefined,
      extent: {
        x0: undefined,
        x1: undefined,
        y0: undefined,
        y1: undefined,
      },
      bounds: {
        x0: 0,
        x1: width,
        y0: 0,
        y1: height,
      },
      isBrushing: false,
      activeHandle: undefined,
    }));
  }

  render() {
    const { start, end } = this.state;
    const {
      top,
      left,
      width: stageWidth,
      height: stageHeight,
      handleSize,
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
    const width = this.width();
    const height = this.height();
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
          {(draw: any) => (
            <Bar
              className="vx-brush-overlay"
              fill="transparent"
              x={0}
              y={0}
              width={stageWidth}
              height={stageHeight}
              onDoubleClick={() => this.reset()}
              onClick={() => (event: MouseEvent) => {
                const duration = this.mouseUpTime - this.mouseDownTime;
                if (onClick && duration < clickSensitivity) onClick(event);
              }}
              onMouseDown={() => (event: MouseEvent) => {
                this.mouseDownTime = new Date();
                draw.dragStart(event);
              }}
              onMouseLeave={() => (event: MouseEvent) => {
                if (onMouseLeave) onMouseLeave(event);
              }}
              onMouseMove={() => (event: MouseEvent) => {
                if (!draw.isDragging && onMouseMove) onMouseMove(event);
                if (draw.isDragging) draw.dragMove(event);
              }}
              onMouseUp={() => (event: MouseEvent) => {
                this.mouseUpTime = new Date();
                if (onMouseUp) onMouseUp(event);
                draw.dragEnd(event);
              }}
              style={{ cursor: 'crosshair' }}
            />
          )}
        </Drag>
        {/* selection */}
        {start && end && (
          <BrushSelection
            updateBrush={this.update}
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
            {...selectedBoxStyle}
          />
        )}
        {/* handles */}
        {start &&
          end &&
          Object.keys(handles)
            //@ts-ignore
            .filter(handleKey => resizeTriggerAreaSet.has(handleKey))
            .map(handleKey => {
              const handle = handles[handleKey];

              return (
                <BrushHandle
                  key={`handle-${handleKey}`}
                  type={handleKey}
                  handle={handle}
                  stageWidth={stageWidth}
                  stageHeight={stageHeight}
                  updateBrush={this.update}
                  brush={this.state}
                  onBrushEnd={onBrushEnd}
                />
              );
            })}
        {/* corners */}
        {start &&
          end &&
          Object.keys(corners)
            //@ts-ignore
            .filter(cornerKey => resizeTriggerAreaSet.has(cornerKey))
            .map(cornerKey => {
              const corner = corners[cornerKey];

              return (
                <BrushCorner
                  key={`corner-${cornerKey}`}
                  type={cornerKey}
                  brush={this.state}
                  updateBrush={this.update}
                  stageWidth={stageWidth}
                  stageHeight={stageHeight}
                  x={corner.x}
                  y={corner.y}
                  width={handleSize}
                  height={handleSize}
                  onBrushEnd={onBrushEnd}
                  fill="transparent"
                />
              );
            })}
      </Group>
    );
  }
}
