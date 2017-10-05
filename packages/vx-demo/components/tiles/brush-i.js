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

export default class BrushOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextTransform: identity(),
      contextScale: xScaleContext,
    };
    this.rescaleContextX = this.rescaleContextX.bind(this);
    this.handleContextWheel = this.handleContextWheel.bind(this);
  }
  rescaleContextX(transform) {
    const { contextScale } = this.state;
    const nextContextScale = contextScale.copy();

    // constrain scale extent
    const { a: _sx } = transform;
    if (_sx < 1) transform.a = 1;
    if (_sx > 3) transform.a = 3;

    let { a: sx, d: sy, e: tx, f: ty } = transform;
    const nextDomain = contextScale
      .range()
      .map(x => invertX({ x, tx, sx }))
      .map(xScaleContext.invert);

    nextContextScale.domain(nextDomain);

    this.setState((state, props) => {
      return {
        contextScale: nextContextScale,
        contextTransform: transform,
      };
    });
  }
  handleContextWheel(event) {
    event.preventDefault();
    const { contextTransform } = this.state;
    const increase = event.deltaY < 0;
    const scaleBy = increase ? 1.1 : 0.9;
    const nextTransform = transform(
      contextTransform,
      scale(scaleBy, 0),
    );

    this.rescaleContextX(nextTransform);
  }
  render() {
    const { contextTransform, contextScale } = this.state;
    const contextDomain = contextScale.domain();
    const x0 = xScaleFocus(contextDomain[0]);
    const focusBrushWidth = xScaleFocus(contextDomain[1]) - x0;
    console.log(contextDomain);
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
            <Drag
              svg={this.svg}
              onDragMove={({ dx, dy }) => {
                this.rescaleContextX(
                  transform(
                    this.state.contextTransform,
                    translate(dx, dy),
                  ),
                );
              }}
            >
              {({ dragStart, dragMove, dragEnd }) => (
                <rect
                  width={contextWidth}
                  height={contextHeight}
                  fill="transparent"
                  onWheel={this.handleContextWheel}
                  onMouseDown={dragStart}
                  onMouseUp={dragEnd}
                  onMouseMove={dragMove}
                />
              )}
            </Drag>
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
              <Group>
                <rect
                  fill="steelblue"
                  fillOpacity={0.5}
                  width={focusBrushWidth}
                  height={focusHeight}
                  x={x0}
                />
              </Group>
            </Group>
          </Group>
        </svg>
      </div>
    );
  }
}
