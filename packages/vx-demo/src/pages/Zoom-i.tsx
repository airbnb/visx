import React from 'react';
import Show from '../components/Show';
import ZoomI from '../components/tiles/Zoom-i';

export default () => {
  return (
    <Show component={ZoomI} title="Zoom I">
      {`import React from 'react';
import { Zoom } from '@vx/zoom';
import { localPoint } from '@vx/event';
import { RectClipPath } from '@vx/clip-path';
import { genPhyllotaxis } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { interpolateRainbow } from 'd3-scale-chromatic';

const bg = '#0a0a0a';
const points = [...new Array(1000)];

const colorScale = scaleLinear({ range: [0, 1], domain: [0, 1000] });
const sizeScale = scaleLinear({ domain: [0, 600], range: [0.5, 8] });

const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  translateX: -211.62,
  translateY: 162.59,
  skewX: 0,
  skewY: 0
};

class ZoomDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMiniMap: true };
    this.toggleMiniMap = this.toggleMiniMap.bind(this);
  }

  toggleMiniMap() {
    this.setState(prevState => {
      return {
        showMiniMap: !prevState.showMiniMap
      };
    });
  }

  render() {
    const { width, height } = this.props;
    const { showMiniMap } = this.state;

    const gen = genPhyllotaxis({ radius: 10, width, height });
    const phyllotaxis = points.map((d, i) => gen(i));

    return (
      <Zoom
        width={width}
        height={height}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        transformMatrix={initialTransform}
      >
        {zoom => {
          return (
            <div style={{ position: 'relative' }}>
              <svg
                width={width}
                height={height}
                style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab' }}
              >
                  <RectClipPath id="zoom-clip" width={width} height={height} />
                <rect width={width} height={height} rx={14} fill={bg} />
                <g transform={zoom.toString()}>
                  {phyllotaxis.map((point, i) => {
                    return (
                      <React.Fragment key={\`dot-\${i}\`}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                          fill={interpolateRainbow(colorScale(i))}
                        />
                      </React.Fragment>
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
                  onMouseLeave={() => {
                    if (!zoom.isDragging) return;
                    zoom.dragEnd();
                  }}
                  onDoubleClick={event => {
                    const point = localPoint(event);
                    zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                  }}
                />
                {showMiniMap && (
                  <g
                    clipPath="url(#zoom-clip)"
                    transform={\`
                      scale(0.25)
                      translate(\${width * 4 - width - 60}, \${height * 4 - height - 60})
                    \`}
                  >
                    <rect width={width} height={height} fill="#1a1a1a" />
                    {phyllotaxis.map((d, i) => {
                      const { x, y } = d;
                      return (
                        <React.Fragment key={\`dot-sm-\${i}\`}>
                          <circle
                            cx={x}
                            cy={y}
                            r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                            fill={interpolateRainbow(colorScale(i))}
                          />
                        </React.Fragment>
                      );
                    })}
                    <rect
                      width={width}
                      height={height}
                      fill="white"
                      fillOpacity={0.2}
                      stroke="white"
                      strokeWidth={4}
                      transform={zoom.toStringInvert()}
                    />
                  </g>
                )}
              </svg>
              <div className="controls">
                <button
                  className="btn btn-zoom"
                  onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                >
                  +
                </button>
                <button
                  className="btn btn-zoom btn-bottom"
                  onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                >
                  -
                </button>
                <button className="btn btn-lg" onClick={zoom.center}>
                  Center
                </button>
                <button className="btn btn-lg" onClick={zoom.reset}>
                  Reset
                </button>
                <button className="btn btn-lg" onClick={zoom.clear}>
                  Clear
                </button>
              </div>
              <div className="mini-map">
                <button className="btn btn-lg" onClick={this.toggleMiniMap}>
                  {showMiniMap ? 'Hide' : 'Show'} Mini Map
                </button>
              </div>
            </div>
          );
        }}
      </Zoom>
    );
  }
}`}
    </Show>
  );
};
