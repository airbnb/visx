import React from 'react';
import { genPhyllotaxis } from '@vx/mock-data';
import { localPoint } from '@vx/event';
import { ZoomTransform, zoomIdentity } from '@vx/zoom';
import { Point } from '@vx/point';

const width = 960;
const height = 500;
const gen = genPhyllotaxis({ radius: 10, width, height });
const data = [...Array(2000)].map((d, i) => gen(i));
const center = new Point({ x: width / 2, y: height / 2 });
const focus = data[0];

export default class Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.handleWheel = this.handleWheel.bind(this);

    this.start = zoomIdentity
      .translate(center.value())
      .scale(0.5)
      .translate({ x: -focus.x, y: -focus.y });

    this.state = { transform: this.start };
  }

  reset() {
    this.setState({ transform: this.start });
  }

  increase() {
    const { transform } = this.state;
    this.setState({
      transform: transform
        .translate(center.value())
        .scale(1.5)
        .translate({ x: -focus.x, y: -focus.y }),
    });
  }

  decrease() {
    const { transform } = this.state;
    this.setState({
      transform: transform
        .translate(center.value())
        .scale(0.5)
        .translate({ x: -focus.x, y: -focus.y }),
    });
  }

  handleWheel(event) {
    const { transform } = this.state;
    const increase = event.deltaY > 0;
    const scaleBy = increase ? 1.1 : 0.9;

    this.setState({
      transform: transform
        .translate(center.value())
        .scale(scaleBy)
        .translate({ x: -focus.x, y: -focus.y }),
    });
  }

  render() {
    return (
      <div className="Zoom">
        <div>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.decrease}>-</button>
          <button onClick={this.increase}>+</button>
        </div>
        <svg width={width} height={height} ref={s => (this.svg = s)}>
          <rect width={width} height={height} fill="#fdf6e6" />
          <g transform={`${this.state.transform.toString()}`}>
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
          </g>
          <rect
            width={width}
            height={height}
            fill="transparent"
            onWheel={this.handleWheel}
            onDoubleClick={this.increase}
          />
        </svg>
        <div>
          scale: {`${this.state.transform.k}`}
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
        `}</style>
      </div>
    );
  }
}
