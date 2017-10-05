import React from 'react';
import { genPhyllotaxis } from '@vx/mock-data';
import { Point } from '@vx/point';
import { localPoint } from '@vx/event';
import { withZoom } from '@vx/zoom';
import { Transform } from '@vx/transform';
import { withParentSize } from '@vx/responsive';

export default withParentSize(
  withZoom(
    class Zoom extends React.Component {
      constructor(props) {
        super(props);
        const width = props.parentWidth;
        const height = width * 0.45;
        const gen = genPhyllotaxis({
          radius: 4,
          width,
          height,
        });
        this.data = [...Array(2000)].map((d, i) => gen(i));
        this.centerPoint = new Point({
          x: width / 2,
          y: height / 2,
        });
        this.dragging = false;
        this.reset = this.reset.bind(this);
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.center = this.center.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
      }

      reset() {
        const { updateZoomTransform } = this.props;
        updateZoomTransform(
          new Transform()
            .translate(this.centerPoint.x, this.centerPoint.y)
            .scale(1, 1)
            .translate(-this.centerPoint.x, -this.centerPoint.y),
        );
      }

      increase() {
        const { zoomTransform, updateZoomTransform } = this.props;
        const point = this.point || this.center;
        updateZoomTransform(
          zoomTransform
            .translate(point.x, point.y)
            .scale(1.1, 1.1)
            .translate(-point.x, -point.y),
        );
      }

      decrease() {
        const { zoomTransform, updateZoomTransform } = this.props;
        const point = this.point || center;
        updateZoomTransform(
          zoomTransform
            .translate(point.x, point.y)
            .scale(0.9, 0.9)
            .translate(-point.x, -point.y),
        );
      }

      center() {
        const { zoomTransform, updateZoomTransform } = this.props;
        const { scaleX, scaleY } = zoomTransform.getScale();
        this.point = this.centerPoint;
        updateZoomTransform(
          new Transform()
            .translate(this.centerPoint.x, this.centerPoint.y)
            .scale(scaleX, scaleY)
            .translate(-this.centerPoint.x, -this.centerPoint.y),
        );
      }

      handleDoubleClick(event) {
        const { zoomTransform, updateZoomTransform } = this.props;
        const scaleBy = 1.5;
        const { x, y } = localPoint(this.svg, event);
        const tPoint = zoomTransform.transformPoint(x, y);
        this.point = tPoint;
        updateZoomTransform(
          zoomTransform
            .translate(tPoint.x, tPoint.y)
            .scale(scaleBy, scaleBy)
            .translate(-tPoint.x, -tPoint.y),
        );
      }

      handleWheel(event) {
        event.preventDefault();
        const { zoomTransform, updateZoomTransform } = this.props;
        const increase = event.deltaY > 0;
        const scaleBy = increase ? 1.1 : 0.9;
        const { x, y } = localPoint(this.svg, event);
        const tPoint = zoomTransform.transformPoint(x, y);
        this.point = tPoint;
        updateZoomTransform(
          zoomTransform
            .translate(tPoint.x, tPoint.y)
            .scale(scaleBy, scaleBy)
            .translate(-tPoint.x, -tPoint.y),
        );
      }

      handleMouseDown(event) {
        this.dragging = true;
        const { zoomTransform } = this.props;
        const { x, y } = localPoint(this.svg, event);
        const tPoint = zoomTransform.transformPoint(x, y);
        this.point = new Point({ x: tPoint.x, y: tPoint.y });
      }

      handleMouseUp(event) {
        this.dragging = false;
        this.lastMove = null;
      }

      handleMouseMove(event) {
        if (!this.dragging) return;
        const { zoomTransform, updateZoomTransform } = this.props;
        const { x, y } = localPoint(this.svg, event);
        const end = zoomTransform.transformPoint(x, y);

        if (!this.lastMove) {
          this.lastMove = end;
        }
        const move = new Point({
          x: end.x - this.lastMove.x,
          y: end.y - this.lastMove.y,
        });
        updateZoomTransform(zoomTransform.translate(move.x, move.y));
      }

      render() {
        const { zoomTransform } = this.props;
        return (
          <div className="Zoom">
            <svg
              width={this.props.parentWidth - 25}
              height={this.props.parentWidth * 0.45}
              ref={s => (this.svg = s)}
            >
              <rect
                width={this.props.parentWidth - 25}
                height={this.props.parentWidth * 0.45}
                fill="#fdf6e6"
                rx={14}
              />
              <g transform={`${zoomTransform.toString()}`}>
                {this.data.map((d, i) => {
                  const { x, y } = d;
                  return (
                    <circle
                      key={`dot-${i}`}
                      cx={x}
                      cy={y}
                      r={2}
                      fill={i % 2 === 0 ? '#ffcc59' : '#f6b6b6'}
                    />
                  );
                })}
              </g>
              <rect
                width={this.props.parentWidth - 25}
                height={this.props.parentWidth * 0.45}
                fill="transparent"
                onWheel={this.handleWheel}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                onDoubleClick={this.handleDoubleClick}
              />
            </svg>
            <div className="controls">
              <div>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.center}>Center</button>
                <button onClick={this.decrease}>-</button>
                <button onClick={this.increase}>+</button>
              </div>
              <div className="deets">
                <div>
                  <div>
                    scaleX:{' '}
                    {`${Math.round(zoomTransform.getScale().scaleX)}`}
                  </div>
                  <div>
                    scaleY:{' '}
                    {`${Math.round(zoomTransform.getScale().scaleY)}`}
                  </div>
                </div>
                <div>
                  <div>
                    translateX:{' '}
                    {`${Math.round(
                      zoomTransform.getTranslate().translateX,
                    )}`}
                  </div>
                  <div>
                    translateY:{' '}
                    {`${Math.round(
                      zoomTransform.getTranslate().translateY,
                    )}`}
                  </div>
                </div>
              </div>
            </div>

            <style jsx>{`
              .Zoom {
                display: flex;
                flex-direction: column;
                user-select: none;
                position: relative;
              }
              .controls {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: #020129;
                color: white;
              }

              svg {
                margin: 1rem 0;
              }

              .deets {
                display: flex;
                flex-direction: row;
                font-size: 12px;
              }
              .deets > div {
                margin: 0.25rem;
              }
            `}</style>
          </div>
        );
      }
    },
  ),
);
