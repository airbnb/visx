import React from 'react';
import { Point } from '@vx/point';
import { localPoint } from '@vx/event';
import { Transform } from '@vx/transform';

export default class Drag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transform: new Transform(),
      isDragging: false,
      dx: 0,
      dy: 0,
    };

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragMove = this.dragMove.bind(this);
  }
  dragStart(event) {
    const currentPoint = localPoint(this.props.svg, event);
    const nextState = {
      isDragging: true,
      currentPoint,
      startPoint: currentPoint,
    };
    if (this.props.onDragStart)
      this.props.onDragStart({ ...nextState, raise: this.raise });
    this.setState(() => nextState);
  }
  dragMove(event) {
    const { isDragging, transform } = this.state;
    const { svg } = this.props;

    if (!isDragging) return;

    const currentPoint = localPoint(svg, event);
    const end = transform.transformPoint(
      currentPoint.x,
      currentPoint.y,
    );

    if (!this.lastMove) this.lastMove = end;

    const move = new Point({
      x: end.x - this.lastMove.x,
      y: end.y - this.lastMove.y,
    });

    const nextTransform = transform.translate(move.x, move.y);
    const { translateX, translateY } = nextTransform.getTranslate();
    const nextState = {
      transform: nextTransform,
      dx: translateX,
      dy: translateY,
      currentPoint,
      lastPoint: this.lastMove,
    };
    if (this.props.onDragMove)
      this.props.onDragMove({
        ...nextState,
        raise: this.raise,
        event,
      });
    this.setState(nextState);
  }
  dragEnd(event) {
    this.lastMove = null;
    if (this.props.onDragEnd)
      this.props.onDragEnd({ ...this.state, isDragging: false });
    this.setState(() => ({ isDragging: false }));
  }
  raise(items, raiseIndex) {
    const array = items.slice();
    const lastIndex = array.length - 1;
    const raiseItem = array.splice(raiseIndex, 1)[0];
    array.splice(lastIndex, 0, raiseItem);
    return array;
  }
  render() {
    const {
      isDragging,
      transform,
      dx,
      dy,
      currentPoint,
      lastPoint,
      startPoint,
    } = this.state;
    const { children, width, height } = this.props;
    return (
      <g>
        {isDragging && (
          <rect
            width={width}
            height={height}
            onMouseMove={this.dragMove}
            onMouseUp={this.dragEnd}
            fill="transparent"
          />
        )}
        {this.props.children({
          transform,
          isDragging,
          dx,
          dy,
          currentPoint,
          lastPoint,
          startPoint,
          dragStart: this.dragStart,
          dragMove: this.dragMove,
          dragEnd: this.dragEnd,
          raise: this.raise,
        })}
      </g>
    );
  }
}
