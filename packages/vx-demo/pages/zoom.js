import React from 'react';
import Show from '../components/show';
import { Zoom } from '@vx/zoom';
import { genPhyllotaxis } from '@vx/mock-data';

const bg = '#fcd200';

class ZoomDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { width, height, margin } = this.props;
    const gen = genPhyllotaxis({ radius: 10, width, height });
    const phyllotaxis = [...new Array(1000)].map((d, i) => gen(i));
    return (
      <Zoom
        width={width}
        height={height}
        scaleXMin={0.25}
        scaleXMax={10}
        scaleYMin={0.25}
        scaleYMax={10}
      >
        {zoom => {
          console.log(zoom);
          return (
            <div style={{ position: 'relative' }}>
              <svg
                width={width}
                height={height}
                style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab' }}
              >
                <defs>
                  <linearGradient id="dot-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#050300" stopOpacity={1} />
                    <stop offset="100%" stopColor="#050300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <rect width={width} height={height} rx={14} fill={bg} />
                <g transform={zoom.toString()}>
                  {phyllotaxis.map((d, i) => {
                    const { x, y } = d;
                    return (
                      <circle
                        key={`dot-${i}`}
                        cx={x}
                        cy={y}
                        r={4}
                        fill={i % 2 === 0 ? `url(#dot-gradient)` : '#050300'}
                      />
                    );
                  })}
                </g>
                <rect
                  width={width}
                  height={height}
                  rx={14}
                  fill="transparent"
                  onWheel={zoom.handleWheel}
                  onMouseDown={zoom.dragStart}
                  onMouseMove={zoom.dragMove}
                  onMouseUp={zoom.dragEnd}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 15,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}
              >
                <button
                  style={{
                    width: 18,
                    height: 18,
                    padding: 0,
                    margin: 0,
                    textAlign: 'center',
                    border: 'none',
                    background: 'white'
                  }}
                  onClick={() => zoom.scale({ scaleX: 1.5, scaleY: 1.5 })}
                >
                  +
                </button>
                <button
                  style={{
                    width: 18,
                    height: 18,
                    padding: 0,
                    margin: 0,
                    textAlign: 'center',
                    border: 'none',
                    background: 'white',
                    borderTop: '1px solid #efefef'
                  }}
                  onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                >
                  -
                </button>
                <button onClick={zoom.reset}>reset</button>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white',
                    fontSize: 9,
                    fontWeight: 900,
                    lineHeight: 1,
                    padding: 2,
                    marginTop: 1,
                    alignItems: 'flex-end'
                  }}
                >
                  <div>{`scaleX: ${zoom.transformMatrix.scaleX.toFixed(2)}`}</div>
                  <div>{`scaleY: ${zoom.transformMatrix.scaleY.toFixed(2)}`}</div>
                  <div>{`translateX: ${zoom.transformMatrix.translateX.toFixed(2)}`}</div>
                  <div>{`translateY: ${zoom.transformMatrix.translateY.toFixed(2)}`}</div>
                </div>
              </div>
            </div>
          );
        }}
      </Zoom>
    );
  }
}

export default () => {
  return (
    <Show component={ZoomDemo} title="Zoom">
      {``}
    </Show>
  );
};
