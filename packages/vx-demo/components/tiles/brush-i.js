import React from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { appleStock } from '@vx/mock-data';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { RectClipPath } from '@vx/clip-path';
import { withParentSize } from '@vx/responsive';
import { withZoom } from '@vx/zoom';
import { Drag } from '@vx/drag';
import { extent, max, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import {
  decompose,
  identity,
  scale,
  transform,
  translate,
  applyToPoint,
  inverse,
  toString,
} from 'transformation-matrix';

// dimensions
const width = 900;
const height = 450;

const contextMargin = { top: 20, left: 20, right: 20, bottom: 40 };
const contextWidth = width - contextMargin.left - contextMargin.right;
const contextHeight =
  height * 0.75 - contextMargin.top - contextMargin.bottom;

const focusMargin = { top: 15, left: 20, right: 20, bottom: 30 };
const focusWidth = width - focusMargin.left - focusMargin.right;
const focusHeight =
  height -
  contextHeight -
  contextMargin.top -
  contextMargin.bottom -
  focusMargin.top -
  focusMargin.bottom;

// data
const data = appleStock;

// accessors
const x = d => new Date(d.date);
const y = d => d.close;

// scales
const xScaleContext = scaleTime({
  range: [0, contextWidth],
  domain: extent(data, x),
  clamp: true,
});
const yScaleContext = scaleLinear({
  range: [contextHeight, 0],
  domain: [0, max(data, y)],
  nice: true,
});
const xScaleFocus = scaleTime({
  range: [0, contextWidth],
  domain: extent(data, x),
  clamp: true,
});
const yScaleFocus = scaleLinear({
  range: [focusHeight, 0],
  domain: [0, max(data, y)],
  nice: true,
});

const invertX = ({ x, tx, sx }) => (x - tx) / sx;

class Brush extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brush: {
        width: undefined,
        x: undefined,
        x0: undefined,
        x1: undefined,
        y0: undefined,
        y1: undefined,
      },
    };
    this.calcBrushWidth = this.calcBrushWidth.bind(this);
    this.calcBrushX = this.calcBrushX.bind(this);
    this.brushDragStart = this.brushDragStart.bind(this);
    this.brushDragMove = this.brushDragMove.bind(this);
    this.brushDragEnd = this.brushDragEnd.bind(this);
  }
  calcBrushWidth({ currentPoint, startPoint }) {
    return startPoint.x - currentPoint.x < 0
      ? currentPoint.x - startPoint.x
      : startPoint.x - currentPoint.x;
  }
  calcBrushX({ currentPoint, startPoint }) {
    const { margin } = this.props;
    return startPoint.x - currentPoint.x < 0
      ? startPoint.x - margin.left
      : currentPoint.x - margin.left;
  }
  brushDragStart(event) {
    this.setState((state, props) => {
      return {
        brush: {
          width: undefined,
          x: undefined,
          x0: undefined,
          x1: undefined,
          y0: undefined,
          y1: undefined,
        },
      };
    });
  }
  brushDragMove({ event, startPoint, currentPoint }) {
    const { margin, onBrushMove } = this.props;
    const nextState = {
      width: this.calcBrushWidth({ startPoint, currentPoint }),
      x: this.calcBrushX({ startPoint, currentPoint }),
    };
    if (onBrushMove) {
      onBrushMove({ brush: nextState });
    }
    this.setState((state, props) => {
      return { brush: nextState };
    });
  }
  brushDragEnd({ event, currentPoint, startPoint }) {
    const { brush } = this.state;
    const { onBrushEnd } = this.props;
    if (onBrushEnd) {
      onBrushEnd({ currentPoint, startPoint, brush });
    }
    this.setState((state, props) => {
      return {};
    });
  }
  render() {
    const {
      svg,
      height,
      width,
      margin,
      onBrushMove,
      onBrushEnd,
    } = this.props;
    const { brush } = this.state;
    return (
      <Drag
        svg={svg}
        onDragStart={this.brushDragStart}
        onDragMove={this.brushDragMove}
        onDragEnd={this.brushDragEnd}
      >
        {({ dragStart, dragMove, dragEnd, isDragging }) => {
          return (
            <g>
              <rect
                height={height}
                width={width}
                fill="transparent"
                onMouseDown={dragStart}
                onMouseMove={dragMove}
                onMouseUp={dragEnd}
              />
              {!!this.state.brush.width && (
                <Drag
                  svg={svg}
                  onDragMove={({ startPoint, currentPoint, dx }) => {
                    const { brush } = this.state;
                    const nextX =
                      brush.x + dx <= 0
                        ? 0
                        : brush.x + dx + brush.width > width
                          ? brush.x
                          : brush.x + dx;
                    const nextBrush = { ...brush, x: nextX };
                    if (onBrushEnd) {
                      onBrushEnd({
                        currentPoint,
                        startPoint,
                        brush: nextBrush,
                      });
                    }
                    this.setState(state => {
                      return {
                        brush: nextBrush,
                      };
                    });
                  }}
                >
                  {({
                    dragStart: brushDragStart,
                    dragEnd: brushDragEnd,
                    dragMove: brushDragMove,
                    isDragging: brushDragging,
                  }) => {
                    return (
                      <g>
                        {!!brushDragging && (
                          <rect
                            fill="transparent"
                            width={width}
                            height={height}
                            onMouseDown={event => {
                              brushDragStart(event);
                              // dragStart(event);
                            }}
                            onMouseMove={event => {
                              brushDragMove(event);
                              if (!brushDragging) dragMove(event);
                            }}
                            onMouseUp={event => {
                              brushDragEnd(event);
                              if (!brushDragging) dragEnd(event);
                            }}
                          />
                        )}
                        <rect
                          fill="steelblue"
                          fillOpacity={0.5}
                          height={height}
                          width={brush.width}
                          x={brush.x}
                          style={{ cursor: 'move' }}
                          onMouseDown={event => {
                            brushDragStart(event);
                            // dragStart(event);
                          }}
                          onMouseMove={event => {
                            brushDragMove(event);
                            if (!brushDragging) dragMove(event);
                          }}
                          onMouseUp={event => {
                            brushDragEnd(event);
                            if (!brushDragging) dragEnd(event);
                          }}
                        />
                        <Drag
                          svg={svg}
                          onDragMove={({
                            event,
                            currentPoint,
                            startPoint,
                            dx,
                          }) => {
                            this.setState(state => {
                              const nextBrush = {
                                ...this.state.brush,
                                width: state.brush.width - dx,
                                x: state.brush.x + dx,
                              };
                              if (onBrushEnd)
                                onBrushEnd({
                                  currentPoint,
                                  startPoint,
                                  brush: nextBrush,
                                });
                              return { brush: nextBrush };
                            });
                          }}
                        >
                          {({
                            dragStart: westHandleDragStart,
                            dragEnd: westHandleDragEnd,
                            dragMove: westHandleDragMove,
                            isDragging: westHandleDragging,
                          }) => {
                            return (
                              <g>
                                {westHandleDragging && (
                                  <rect
                                    fill="transparent"
                                    style={{
                                      cursor: 'ew-resize',
                                    }}
                                    width={width}
                                    height={height}
                                    onMouseDown={westHandleDragStart}
                                    onMouseMove={westHandleDragMove}
                                    onMouseUp={westHandleDragEnd}
                                  />
                                )}
                                <rect
                                  width={6}
                                  height={height}
                                  fill="transparent"
                                  x={brush.x}
                                  style={{
                                    cursor: 'ew-resize',
                                    pointerEvents: isDragging
                                      ? 'none'
                                      : 'all',
                                  }}
                                  onMouseDown={westHandleDragStart}
                                  onMouseUp={westHandleDragEnd}
                                  onMouseMove={event => {
                                    if (!brushDragging) {
                                      westHandleDragMove(event);
                                    }
                                  }}
                                />
                              </g>
                            );
                          }}
                        </Drag>
                        <Drag
                          svg={svg}
                          onDragMove={({
                            event,
                            currentPoint,
                            startPoint,
                            dx,
                          }) => {
                            this.setState(state => {
                              const cur =
                                currentPoint.x - margin.left;
                              const invert =
                                currentPoint.x - margin.left <=
                                state.brush.x;
                              const nextWidth = invert
                                ? 10
                                : state.brush.width + dx;
                              const nextX = invert
                                ? cur
                                : state.brush.x;
                              const nextBrush = {
                                ...this.state.brush,
                                width: nextWidth,
                                x: nextX,
                              };
                              if (onBrushEnd)
                                onBrushEnd({
                                  currentPoint,
                                  startPoint,
                                  brush: nextBrush,
                                });
                              return { brush: nextBrush };
                            });
                          }}
                        >
                          {({
                            dragStart: eastHandleDragStart,
                            dragEnd: eastHandleDragEnd,
                            dragMove: eastHandleDragMove,
                            isDragging: eastHandleDragging,
                          }) => {
                            return (
                              <g>
                                {eastHandleDragging && (
                                  <rect
                                    fill="transparent"
                                    width={width}
                                    height={height}
                                    style={{
                                      cursor: 'ew-resize',
                                    }}
                                    onMouseDown={eastHandleDragStart}
                                    onMouseMove={eastHandleDragMove}
                                    onMouseUp={eastHandleDragEnd}
                                  />
                                )}
                                <rect
                                  width={6}
                                  height={height}
                                  fill="transparent"
                                  x={brush.x + brush.width - 6}
                                  style={{
                                    cursor: 'ew-resize',
                                    pointerEvents: isDragging
                                      ? 'none'
                                      : 'all',
                                  }}
                                  onMouseDown={eastHandleDragStart}
                                  onMouseMove={event => {
                                    if (!brushDragging)
                                      eastHandleDragMove(event);
                                  }}
                                  onMouseUp={eastHandleDragEnd}
                                />
                              </g>
                            );
                          }}
                        </Drag>
                      </g>
                    );
                  }}
                </Drag>
              )}
            </g>
          );
        }}
      </Drag>
    );
  }
}

export default class BrushOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextScale: xScaleContext,
      focusScale: xScaleFocus,
    };
    this.updateContextScale = this.updateContextScale.bind(this);
  }
  componentDidMount() {
    this.forceUpdate();
  }
  updateContextScale({ currentPoint, startPoint, brush }) {
    this.setState((state, props) => {
      if (!brush.width || !brush.x) {
        return { contextScale: xScaleContext.copy() };
      }
      const brushDomain = [
        state.focusScale.invert(brush.x),
        state.focusScale.invert(brush.x + brush.width),
      ];
      const nextContextScale = state.contextScale.copy();
      nextContextScale.domain(brushDomain);
      return {
        contextScale: nextContextScale,
      };
    });
  }
  render() {
    const { contextScale } = this.state;
    return (
      <div className="BrushOne">
        <svg width={width} height={height} ref={s => (this.svg = s)}>
          <RectClipPath
            width={contextWidth}
            height={contextHeight}
            id="ContextClip"
          />
          <rect
            fill="transparent"
            stroke="lightgray"
            width={width}
            height={
              contextHeight + contextMargin.top + contextMargin.bottom
            }
          />
          <Group top={contextMargin.top} left={contextMargin.left}>
            <AxisBottom
              top={contextHeight}
              scale={contextScale}
              data={data}
              hideTicks
              hideAxisLine
              tickLength={1}
            />
            <rect
              fill="lightgray"
              width={contextWidth}
              height={contextHeight}
            />
            <AreaClosed
              data={data}
              xScale={contextScale}
              yScale={yScaleContext}
              x={x}
              y={y}
              strokeWidth={0}
              curve={curveMonotoneX}
              clipPath="url(#clip)"
            />
          </Group>
          <Group
            top={
              contextHeight + contextMargin.bottom + contextMargin.top
            }
          >
            <rect
              fill="transparent"
              stroke="lightgray"
              width={width}
              height={
                focusHeight + focusMargin.top + focusMargin.bottom
              }
            />
            <Group left={focusMargin.left} top={focusMargin.top}>
              <AxisBottom
                top={focusHeight}
                scale={xScaleFocus}
                data={data}
                hideTicks
                hideAxisLine
                tickLength={1}
              />
              <rect
                fill="lightgray"
                width={focusWidth}
                height={focusHeight}
              />
              <AreaClosed
                data={data}
                xScale={xScaleFocus}
                yScale={yScaleFocus}
                x={x}
                y={y}
                strokeWidth={0}
                curve={curveMonotoneX}
              />
              <Brush
                svg={this.svg}
                width={focusWidth}
                height={focusHeight}
                margin={focusMargin}
                onBrushEnd={this.updateContextScale}
              />
            </Group>
          </Group>
        </svg>
      </div>
    );
  }
}
