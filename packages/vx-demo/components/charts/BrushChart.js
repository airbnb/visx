import React from 'react';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Axis from '@vx/axis';
import colors from '../util/sillyColorScale';
import { Motion, spring } from 'react-motion';
import { compose, withState, withHandlers, pure } from 'recompose';

const points = Mock.genRandomNormalPoints();

function getCoordsFromEvent(node, event) {
  if (!node) return;
  const svg = node.ownerSVGElement || node;
  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return {
      x: point.x,
      y: point.y
    };
  }
  let rect = node.getBoundingClientRect();
  return {
    x: event.clientX - rect.left - node.clientLeft,
    y: event.clientY - rect.top - node.clientTop
  };
}

function constrainToRegion({ region, x, y }) {
  const { x0, x1, y0, y1 } = region;
  return {
    x: x < x0 ? x0 : x > x1 ? x1 : x,
    y: y < y0 ? y0 : y > y1 ? y1 : y,
  }
}

function CustomBrush(props) {
  const { brush, extent, ...otherProps } = props;
  console.log(otherProps)
  const { start, end, isBrushing } = brush;
  if (!start) return null;
  if (!end) return null;
  const x = end.x > start.x ? start.x : end.x;
  const y = end.y > start.y ? start.y : end.y;
  const width = Math.abs(start.x - end.x);
  const height = Math.abs(start.y - end.y);
  return (
    <g className="vx-brush">
      {isBrushing &&
        <g>
          <rect
            fill="rgba(102, 181, 245, 0.1)"
            stroke="rgba(102, 181, 245, 1)"
            strokeWidth={1}
            x={x}
            y={y}
            width={width}
            height={height}
          />
        </g>
      }
    </g>
  );
}

const withBrush = compose(
  withState('brush', 'updateBrush', {
    start: undefined,
    end: undefined,
    domain: undefined,
    isBrushing: false,
  }),
  withHandlers({
    onBrushStart: ({ updateBrush }) => ({ x, y }) => {
      updateBrush((prevState) => ({
        ...prevState,
        start: { x, y },
        isBrushing: true,
        end: undefined,
        domain: undefined,
      }));
    },
    onBrushDrag: ({ updateBrush }) => ({ x, y }) => {
      updateBrush((prevState) => ({
        ...prevState,
        end: { x, y },
        domain: undefined,
      }));
    },
    onBrushEnd: ({ updateBrush }) => ({ x, y }) => {
      updateBrush((prevState) => {
        const { start } = prevState;
        return {
          ...prevState,
          isBrushing: false,
          domain: {
            x0: Math.min(start.x, x),
            x1: Math.max(start.x, x),
            y0: Math.min(start.y, y),
            y1: Math.max(start.y, y),
          }
        }
      });
    },
    onBrushReset: ({ updateBrush }) => event => {
      updateBrush((prevState) => ({
        start: undefined,
        end: undefined,
        domain: undefined,
        isBrushing: false,
      }));
    }
  })
);

class BrushChart extends React.Component {
  constructor(props) {
    super(props);
    const { width, height, margin } = props;

    this.extent = {
      x0: margin.left,
      x1: width - margin.left,
      y0: margin.top,
      y1: height - margin.top,
    };

    this.initialDomain = {
      x: [-4.5, 4.5],
      y: [-4.5 / 2, 4.5 / 2]
    };

    this.xScale = Scale.scaleLinear({
      domain: this.initialDomain.x,
      range: [0, width - margin.left - margin.right],
      clamp: true,
    });

    this.yScale = Scale.scaleLinear({
      domain: this.initialDomain.y,
      range: [height - margin.top - margin.bottom, 0],
      clamp: true,
    });

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  scaleReset() {
    const { xScale, yScale, initialDomain } = this;
    xScale.domain(initialDomain.x);
    yScale.domain(initialDomain.y);
  }

  handleMouseDown(event) {
    const { onBrushStart } = this.props;
    const { extent: region } = this;
    const { x, y } = getCoordsFromEvent(this.svg, event);
    onBrushStart(constrainToRegion({ region, x, y }));
  }

  handleMouseMove(event) {
    const { brush, onBrushDrag, updateBrush } = this.props;
    // only update the brush region if we're dragging
    if (!brush.isBrushing) return;
    const { extent: region } = this;
    const { x, y } = getCoordsFromEvent(this.svg, event);
    onBrushDrag(constrainToRegion({ region, x, y }));
  }

  handleMouseUp(event) {
    const { brush, onBrushEnd, onBrushReset } = this.props;
    const { extent: region } = this;
    if (brush.end) {
      const { x, y } = getCoordsFromEvent(this.svg, event);
      onBrushEnd(constrainToRegion({ region, x, y }));
      return;
    }
    onBrushReset(event);
    this.scaleReset();
  }

  render() {
    const { width, height, brush, margin } = this.props;
    const { xScale, yScale } = this;

    const x = d => d[0];
    const y = d => d[1];
    const z = d => d[2];

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    if (brush.domain) {
      const { domain } = brush;
      const { x0, x1, y0, y1 } = domain;
      xScale.domain([x0, x1].map(d => d - margin.left).map(xScale.invert));
      yScale.domain([y1, y0].map(d => d - margin.top).map(yScale.invert));
    }

    return (
      <svg
        ref={(c) => { this.svg = c; }}
        width={width}
        height={height}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <Axis.AxisBottom
          scale={xScale}
          top={yMax + margin.top}
          left={margin.left}
          label={''}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
        <Axis.AxisLeft
          scale={yScale}
          top={margin.top}
          left={margin.left}
          label={''}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
        <Group top={margin.top} left={margin.left}>
          {points.map((point) => {
            return (
              <Motion
                key={`${x(point)}-${y(point)}-${z(point)}`}
                defaultStyle={{ x: xMax / 2, y: yMax / 2 }}
                style={{
                  x: spring(xScale(x(point))),
                  y: spring(yScale(y(point))),
                }}>
                {interpolatingStyle => {
                  return (
                    <circle
                      fill={colors(z(point))}
                      cx={interpolatingStyle.x}
                      cy={interpolatingStyle.y}
                      r={3}
                    />
                  );
                }}
              </Motion>
            );
          })}
        </Group>
        <CustomBrush
          brush={brush}
          fill={'black'}
          onMouseDown={'blue'}
        />
      </svg>
    );
  }
}

export default withBrush(BrushChart);
