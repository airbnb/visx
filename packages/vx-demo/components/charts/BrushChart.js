import React from 'react';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Axis from '@vx/axis';
import colors from '../util/sillyColorScale';
import { Motion, spring } from 'react-motion';

const points = Mock.genRandomNormalPoints();

const localXY = (event, svg, point) => {
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function getPlotCoords(node, event) {
  if (!node) return;
  const svg = node.ownerSVGElement || node;
  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return {x: point.x, y: point.y};
  }
  var rect = node.getBoundingClientRect();
  return {
    x: event.clientX - rect.left - node.clientLeft,
    y: event.clientY - rect.top - node.clientTop
  };
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

  componentWillMount() {
    const { width, height, margin } = this.props;
    const k = height / width;
    const x0 = [-4.5, 4.5];
    const y0 = x0.map(x => x * k);
    this.setState({
      xScale: Scale.scaleLinear({
        domain: x0,
        range: [0, width - margin.left - margin.right],
        clamp: true,
      }),
      yScale: Scale.scaleLinear({
        domain: y0,
        range: [height - margin.top - margin.bottom, 0],
        clamp: true,
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.xDomain === this.state.xDomain && !this.state.dragging) return false;
    if (nextState.yDomain === this.state.yDomain && !this.state.dragging) return false;
    return true;
  }

  handleMouseDown(event) {
    const { x, y } = getPlotCoords(this.node, event);
    this.setState({
      start: { x, y },
      end: undefined,
      dragging: true,
    });
  }

  handleMouseUp() {
    const { start, end } = this.state;
    const { x, y } = getPlotCoords(this.node, event);
    if (end) {
      return this.setState({
        dragging: false,
        xDomain: [start.x - this.props.margin.left, end.x - this.props.margin.left],
        yDomain: [end.y - this.props.margin.top, start.y - this.props.margin.top],
      });
    } else {
      this.setState({
        dragging: false,
        xDomain: undefined,
        yDomain: undefined,
      });
    }
  }

  handleMouseMove(event) {
    const { x, y } = getPlotCoords(this.node, event);
    if (!this.state.dragging) {
      return this.setState({
        hover: { x, y },
      })
    };
    this.setState({
      end: { x, y },
      hover: { x, y },
    });
  }

  render() {
    let xBrush;
    let yBrush;
    let brushWidth;
    let brushHeight;
    let cornerSize;
    const { width, height, margin } = this.props;
    const { start, end, dragging, hover, xScale, yScale, xDomain, yDomain } = this.state;
    const k = height / width;
    const x0 = [-4.5, 4.5];
    const y0 = x0.map(x => x * k);

    if (!!start && !!end) {
      xBrush = end.x < start.x ? end.x : start.x;
      yBrush = end.y < start.y ? end.y : start.y;
      brushWidth = end.x >= start.x ? end.x - start.x : start.x - end.x;
      brushHeight = end.y >= start.y ? end.y - start.y : start.y - end.y;
      cornerSize = 4;
    }

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => d[0];
    const y = d => d[1];
    const z = d => d[2];

    if (!!end && !dragging && !!xDomain) {
      xScale.domain(xDomain.map(xScale.invert, xScale))
    }

    if (!!end && !dragging && !!yDomain) {
      yScale.domain(yDomain.map(yScale.invert, xScale))
    }

    if (!yDomain) yScale.domain(y0);
    if (!xDomain) xScale.domain(x0);

    return (
      <svg
        width={width}
        height={height}
        ref={(c) => { this.node = c; }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
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
        <g
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          {points.map((point) => {
            return (
              <Motion key={`${x(point)}-${y(point)}-${z(point)}`} defaultStyle={{x: xMax / 2, y: yMax / 2}} style={{x: spring(xScale(x(point))), y: spring(yScale(y(point)))}}>
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
          {false && hover &&
            <g>
              <rect
                x={hover.x}
                y={0}
                width={1}
                height={yMax}
                fill={'blue'}
              />
              <rect
                x={0}
                y={hover.y}
                width={xMax}
                height={1}
                fill={'blue'}
              />
            </g>
          }
          {xBrush && yBrush && dragging &&
            <g>
              <rect
                className="vx-brush"
                fill={'rgba(102, 181, 245, 0.1)'}
                stroke={'rgba(102, 181, 245, 1)'}
                strokeWidth={1}
                x={xBrush - margin.left}
                y={yBrush - margin.top}
                width={brushWidth}
                height={brushHeight}
              />
            </g>
          }
        </g>
      </svg>
    );
  }
}
