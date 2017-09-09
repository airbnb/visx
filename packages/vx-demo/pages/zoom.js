import React from 'react';
import { genPhyllotaxis } from '@vx/mock-data';
import { Point } from '@vx/point';
import { localPoint } from '@vx/event';
import { withZoom } from '@vx/zoom';
import { Transform } from '@vx/transform';

const width = 960;
const height = 500;
const gen = genPhyllotaxis({ radius: 10, width, height });
const data = [...Array(2000)].map((d, i) => gen(i));
const center = new Point({ x: width / 2, y: height / 2 });
var isInside = (x1, x2, y1, y2, r) =>
  Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) >= r * r;

export default withZoom(
  class Zoom extends React.Component {
    constructor(props) {
      super(props);
      this.reset = this.reset.bind(this);
      this.increase = this.increase.bind(this);
      this.decrease = this.decrease.bind(this);
      this.center = this.center.bind(this);
      this.handleWheel = this.handleWheel.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleDoubleClick = this.handleDoubleClick.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);

      this.dragging = false;
    }

    reset() {
      const { updateZoomTransform } = this.props;
      updateZoomTransform(
        new Transform()
          .translate(center.x, center.y)
          .scale(0.5, 0.5)
          .translate(-center.x, -center.y)
      );
    }

    increase() {
      const { zoomTransform } = this.props;
      const point = this.point || center;
      updateZoomTransform(
        zoomTransform
          .translate(point.x, point.y)
          .scale(1.1, 1.1)
          .translate(-point.x, -point.y)
      );
    }

    decrease() {
      const { zoomTransform } = this.props;
      const point = this.point || center;
      updateZoomTransform(
        zoomTransform
          .translate(point.x, point.y)
          .scale(0.9, 0.9)
          .translate(-point.x, -point.y)
      );
    }

    center() {
      const { zoomTransform } = this.props;
      this.point = center;
      updateZoomTransform(
        new Transform()
          .translate(center.x, center.y)
          .scale(transform.getScale().scaleX, transform.getScale().scaleY)
          .translate(-center.x, -center.y)
      );
    }

    handleClick(event) {
      const { transform } = this.state;
      const tCenter = transform.transformPoint(center.x, center.y);
      const move = new Point({
        x: tCenter.x - this.point.x,
        y: tCenter.y - this.point.y
      });
      this.setState({
        transform: transform.translate(move.x, move.y)
      });
    }

    handleDoubleClick(event) {
      const { transform } = this.state;
      const scaleBy = 1.5;
      const { x, y } = localPoint(this.svg, event);
      const tPoint = transform.transformPoint(x, y);
      this.point = tPoint;
      this.setState({
        transform: transform
          .translate(tPoint.x, tPoint.y)
          .scale(scaleBy, scaleBy)
          .translate(-tPoint.x, -tPoint.y)
      });
    }

    handleWheel(event) {
      event.preventDefault();
      const { transform } = this.state;
      const increase = event.deltaY > 0;
      const scaleBy = increase ? 1.1 : 0.9;
      const { x, y } = localPoint(this.svg, event);
      const tPoint = transform.transformPoint(x, y);
      this.point = tPoint;
      this.setState({
        transform: transform
          .translate(tPoint.x, tPoint.y)
          .scale(scaleBy, scaleBy)
          .translate(-tPoint.x, -tPoint.y)
      });
    }

    handleMouseDown(event) {
      this.dragging = true;
      const { transform } = this.state;
      const { x, y } = localPoint(this.svg, event);
      const tPoint = transform.transformPoint(x, y);
      this.point = new Point({ x: tPoint.x, y: tPoint.y });
    }

    handleMouseUp(event) {
      this.dragging = false;
      this.lastMove = null;
    }

    handleMouseMove(event) {
      if (!this.dragging) return;
      const { transform } = this.state;
      const { x, y } = localPoint(this.svg, event);
      const end = transform.transformPoint(x, y);

      if (!this.lastMove) {
        this.lastMove = end;
      }
      const move = new Point({
        x: end.x - this.lastMove.x,
        y: end.y - this.lastMove.y
      });
      console.log(transform.translate(move.x, move.y));
      this.setState({
        transform: transform.translate(move.x, move.y)
      });
    }

    render() {
      const { zoomTransform } = this.props;
      return (
        <div className="Zoom">
          <div>
            <button onClick={this.reset}>Reset</button>
            <button onClick={this.center}>Center</button>
            <button onClick={this.centerActivePoint}>
              Center active point
            </button>
            <button onClick={this.decrease}>-</button>
            <button onClick={this.increase}>+</button>
          </div>
          <svg width={width} height={height} ref={s => (this.svg = s)}>
            <rect width={width} height={height} fill="#fdf6e6" />
            <g transform={`${zoomTransform.toString()}`}>
              {data.map((d, i) => {
                const { x, y } = d;
                return (
                  <circle
                    key={`dot-${i}`}
                    cx={x}
                    cy={y}
                    r={4}
                    fill={i % 2 === 0 ? '#ffcc59' : '#f6b6b6'}
                  />
                );
              })}
              <rect
                width={width}
                height={height}
                fill="transparent"
                onWheel={this.handleWheel}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
              />
            </g>
          </svg>
          <div className="deets">
            <div>
              <div>
                scaleX: {`${zoomTransform.getScale().scaleX}`}
              </div>
              <div>
                scaleY: {`${zoomTransform.getScale().scaleY}`}
              </div>
            </div>
            <div>
              <div>
                translateX: {`${zoomTransform.getTranslate().translateX}`}
              </div>
              <div>
                translateY: {`${zoomTransform.getTranslate().translateY}`}
              </div>
            </div>
          </div>

          <style jsx>{`
            .Zoom {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 98vh;
              font-family: sans-serif;
              user-select: none;
            }

            svg {
              margin: 1rem 0;
            }

            .deets {
              display: flex;
              flex-direction: row;
            }
            .deets > div {
              margin: 1rem;
            }
          `}</style>
        </div>
      );
    }
  }
);
