import React from 'react';
// import { genPhyllotaxis } from '@vx/mock-data';
import { Point } from '@vx/point';
import { localPoint } from '@vx/event';
import Transform from '../components/transform/Transform';
import Codeblock from '../components/codeblocks/Codeblock';
import Page from '../components/page';

function genPhyllotaxis({ radius, width, height }) {
  const theta = Math.PI * (3 - Math.sqrt(5));
  return function(i) {
    const r = radius * Math.sqrt(i);
    const a = theta * i;
    return new Point({
      x: width / 2 + r * Math.cos(a),
      y: height / 2 + r * Math.sin(a)
    });
  };
}

const width = 960;
const height = 500;
const gen = genPhyllotaxis({ radius: 10, width, height });
const data = [...Array(2000)].map((d, i) => gen(i));
const center = new Point({ x: width / 2, y: height / 2 });

function Code() {
  return (
    <Codeblock>{`import React from 'react';
import { genPhyllotaxis } from '@vx/mock-data';
import { Point } from '@vx/point';
import { localPoint } from '@vx/event';
import { Transform } from '@vx/transform';

const width = 960;
const height = 500;
const gen = genPhyllotaxis({ radius: 10, width, height });
const data = [...Array(2000)].map((d, i) => gen(i));
const center = new Point({ x: width / 2, y: height / 2 });

class TransformPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.center = this.center.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.dragging = false;

    this.state = {
      transform: new Transform()
        .translate(center.x, center.y)
        .scale(0.5, 0.5)
        .translate(-center.x, -center.y)
    };
  }

  reset() {
    this.setState({
      transform: new Transform()
        .translate(center.x, center.y)
        .scale(0.5, 0.5)
        .translate(-center.x, -center.y)
    });
  }

  increase() {
    const { transform } = this.state;
    const point = this.point || center;
    this.setState({
      transform: transform
        .translate(point.x, point.y)
        .scale(1.1, 1.1)
        .translate(-point.x, -point.y)
    });
  }

  decrease() {
    const { transform } = this.state;
    const point = this.point || center;
    this.setState({
      transform: transform
        .translate(point.x, point.y)
        .scale(0.9, 0.9)
        .translate(-point.x, -point.y)
    });
  }

  center() {
    const { transform } = this.state;
    this.point = center;
    this.setState({
      transform: new Transform()
        .translate(center.x, center.y)
        .scale(transform.getScale().scaleX, transform.getScale().scaleY)
        .translate(-center.x, -center.y)
    });
  }

  handleClick(event) {
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
    this.point = new Point({
      x: end.x - this.lastMove.x,
      y: end.y - this.lastMove.y
    });
    this.setState({
      transform: transform.translate(this.point.x, this.point.y)
    });
  }

  render() {
    return (
        <div className="Transform">
          <div>
            <button onClick={this.reset}>Reset</button>
            <button onClick={this.center}>Center</button>
            <button onClick={this.decrease}>-</button>
            <button onClick={this.increase}>+</button>
          </div>
          <svg width={width} height={height} ref={s => (this.svg = s)}>
            <rect
              width={width}
              height={height}
              fill="#fdf6e6"
              onWheel={this.handleWheel}
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}
              onDoubleClick={this.handleClick}
            />
            <g
              transform={\`\${this.state.transform &&
                this.state.transform.toString()}\`}
            >
              {data.map((d, i) => {
                const { x, y } = d;
                return (
                  <circle
                    key={\`dot-\${i}\`}
                    cx={x}
                    cy={y}
                    r={4}
                    fill={i % 2 === 0 ? '#ffcc59' : '#f6b6b6'}
                    onWheel={this.handleWheel}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                    onDoubleClick={this.handleClick}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      );
    }
  }
`}</Codeblock>
  );
}

export default class TransformPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.center = this.center.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.dragging = false;

    this.state = {
      transform: new Transform()
        .translate(center.x, center.y)
        .scale(0.5, 0.5)
        .translate(-center.x, -center.y)
    };
  }

  reset() {
    this.setState({
      transform: new Transform()
        .translate(center.x, center.y)
        .scale(0.5, 0.5)
        .translate(-center.x, -center.y)
    });
  }

  increase() {
    const { transform } = this.state;
    const point = this.point || center;
    this.setState({
      transform: transform
        .translate(point.x, point.y)
        .scale(1.1, 1.1)
        .translate(-point.x, -point.y)
    });
  }

  decrease() {
    const { transform } = this.state;
    const point = this.point || center;
    this.setState({
      transform: transform
        .translate(point.x, point.y)
        .scale(0.9, 0.9)
        .translate(-point.x, -point.y)
    });
  }

  center() {
    const { transform } = this.state;
    this.point = center;
    this.setState({
      transform: new Transform()
        .translate(center.x, center.y)
        .scale(transform.getScale().scaleX, transform.getScale().scaleY)
        .translate(-center.x, -center.y)
    });
  }

  handleClick(event) {
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
    this.point = new Point({
      x: end.x - this.lastMove.x,
      y: end.y - this.lastMove.y
    });
    this.setState({
      transform: transform.translate(this.point.x, this.point.y)
    });
  }

  render() {
    return (
      <Page>
        <div className="demo">
          <div className="TransformPlayground">
            <div>
              <button onClick={this.reset}>Reset</button>
              <button onClick={this.center}>Center</button>
              <button onClick={this.decrease}>-</button>
              <button onClick={this.increase}>+</button>
            </div>
            <svg width={width} height={height} ref={s => (this.svg = s)}>
              <rect
                width={width}
                height={height}
                fill="#fdf6e6"
                onWheel={this.handleWheel}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                onDoubleClick={this.handleClick}
              />
              <g
                transform={`${this.state.transform &&
                  this.state.transform.toString()}`}
              >
                {data.map((d, i) => {
                  const { x, y } = d;
                  return (
                    <circle
                      key={`dot-${i}`}
                      cx={x}
                      cy={y}
                      r={4}
                      fill={i % 2 === 0 ? '#ffcc59' : '#f6b6b6'}
                      onWheel={this.handleWheel}
                      onMouseDown={this.handleMouseDown}
                      onMouseUp={this.handleMouseUp}
                      onMouseMove={this.handleMouseMove}
                      onDoubleClick={this.handleClick}
                    />
                  );
                })}
              </g>
            </svg>
            <div className="deets">
              <div>
                <div>
                  scaleX: {`${this.state.transform.getScale().scaleX}`}
                </div>
                <div>
                  scaleY: {`${this.state.transform.getScale().scaleY}`}
                </div>
              </div>
              <div>
                <div>
                  translateX:{' '}
                  {`${this.state.transform.getTranslate().translateX}`}
                </div>
                <div>
                  translateY:{' '}
                  {`${this.state.transform.getTranslate().translateY}`}
                </div>
              </div>
            </div>
          </div>
          <div className="code">
            <Code />
          </div>

          <style jsx>{`
            .TransformPlayground {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 98vh;
              font-family: sans-serif;
              user-select: none;
            }

            .demo {
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow: hidden;
            }

            .code {
              display: flex;
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
      </Page>
    );
  }
}
