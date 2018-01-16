import React from 'react';
import PropTypes from 'prop-types';
import { localPoint } from '@vx/event';

export default class Drag extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    captureDragArea: PropTypes.bool,
  };

  static defaultProps = {
    captureDragArea: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      x: undefined,
      y: undefined,
      dx: 0,
      dy: 0,
      isDragging: false,
    };
    this.dragEnd = this.dragEnd.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  dragStart(event) {
    const { svg, onDragStart } = this.props;
    const { dx, dy } = this.state;
    const point = localPoint(svg, event);
    const nextState = {
      ...this.state,
      isDragging: true,
      x: -dx + point.x,
      y: -dy + point.y,
    };
    if (onDragStart) onDragStart({ ...nextState, event });
    this.setState(() => nextState);
  }

  dragMove(event) {
    const { svg, onDragMove } = this.props;
    const { x, y, dx, dy, isDragging } = this.state;
    if (!isDragging) return;
    const point = localPoint(svg, event);
    const nextState = {
      ...this.state,
      isDragging: true,
      dx: -(x - point.x),
      dy: -(y - point.y),
    };
    if (onDragMove) onDragMove({ ...nextState, event });
    this.setState(() => nextState);
  }

  dragEnd(event) {
    const { svg, onDragEnd } = this.props;
    const { x, y, dx, dy } = this.state;
    const point = localPoint(svg, event);
    const nextState = {
      ...this.state,
      isDragging: false,
    };
    if (onDragEnd) onDragEnd({ ...nextState, event });
    this.setState(() => nextState);
  }

  render() {
    const { x, y, dx, dy, isDragging } = this.state;
    const { children, width, height, captureDragArea } = this.props;
    return (
      <g>
        {isDragging &&
          captureDragArea && (
            <rect
              width={width}
              height={height}
              onMouseMove={this.dragMove}
              onMouseUp={this.dragEnd}
              fill="transparent"
            />
          )}
        {children({
          x,
          y,
          dx,
          dy,
          isDragging,
          dragEnd: this.dragEnd,
          dragMove: this.dragMove,
          dragStart: this.dragStart,
        })}
      </g>
    );
  }
}
