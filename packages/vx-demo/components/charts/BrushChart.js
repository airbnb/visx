import React from 'react';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Axis from '@vx/axis';
import colors from '../util/sillyColorScale';

const points = Mock.genRandomNormalPoints();

const localXY = (event, svg, point) => {
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

export default class VXSvg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: undefined,
      end: undefined,
      dragging: false,
    };
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    this.point = this.svg.createSVGPoint();
  }

  handleMouseDown(event) {
    const { x, y } = localXY(event, this.svg, this.point);
    this.setState({
      start: { x, y },
      end: undefined,
      dragging: true,
    });
  }

  handleMouseUp() {
    const { x, y } = localXY(event, this.svg, this.point);
    this.setState({
      dragging: false,
    });
  }

  handleMouseMove(event) {
    if (!this.state.dragging) return;
    const { x, y } = localXY(event, this.svg, this.point);
    this.setState({
      end: {x, y},
    });
  }

  render() {
    let xBrush;
    let yBrush;
    let brushWidth;
    let brushHeight;
    let cornerSize;
    const { width, height, margin } = this.props;
    const { start, end } = this.state;

    if (!!start && !!end) {
      xBrush = end.x < start.x ? end.x : start.x;
      yBrush = end.y < start.y ? end.y : start.y;
      brushWidth = end.x >= start.x ? end.x - start.x : start.x - end.x;
      brushHeight = end.y >= start.y ? end.y - start.y : start.y - end.y;
      cornerSize = 4;
    }

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const k = height / width;
    const x0 = [-4.5, 4.5];
    const y0 = x0.map(x => x * k);

    const x = d => d[0];
    const y = d => d[1];
    const z = d => d[2];

    const xScale = Scale.scaleLinear({
      domain: x0,
      range: [0, xMax],
    });
    const yScale = Scale.scaleLinear({
      domain: y0,
      range: [yMax, 0],
    });

    return (
      <svg
        ref={(c) => { this.svg = c; }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        width={width}
        height={height}
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
              <circle
                key={`${x(point)}-${y(point)}-${z(point)}`}
                fill={colors(z(point))}
                cx={xScale(x(point))}
                cy={yScale(y(point))}
                r={3}
              />
            );
          })}
        </Group>
        {xBrush && yBrush &&
          <g>
            <rect
              className="vx-brush"
              fill={'rgba(102, 181, 245, 0.1)'}
              stroke={'rgba(102, 181, 245, 1)'}
              strokeWidth={1}
              x={xBrush}
              y={yBrush}
              width={brushWidth}
              height={brushHeight}
            />
          </g>
        }
      </svg>
    );
  }
}
