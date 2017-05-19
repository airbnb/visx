import React from 'react';
import Codeblock from './Codeblock';

export default ({}) => {
  return (
    <Codeblock>
      {`// BrushChart.js
import React from 'react';
import { genRandomNormalPoints } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import colors from '../util/sillyColorScale';
import { Motion, spring } from 'react-motion';
import {
  BoxBrush,
  withBrush,
  getCoordsFromEvent,
  constrainToRegion
} from '@vx/brush';

const points = genRandomNormalPoints();

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

    this.xScale = scaleLinear({
      domain: this.initialDomain.x,
      range: [0, width - margin.left - margin.right],
      clamp: true,
    });

    this.yScale = scaleLinear({
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
        <AxisBottom
          scale={xScale}
          top={yMax + margin.top}
          left={margin.left}
          label={''}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
        <AxisLeft
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
                key={"%{x(point)}-%{y(point)}-%{z(point)}"}
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
        <BoxBrush brush={brush} />
      </svg>
    );
  }
}

export default withBrush(BrushChart);
`}
    </Codeblock>
  );
}
