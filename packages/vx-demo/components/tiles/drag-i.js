import React from 'react';
import { genPhyllotaxis } from '@vx/mock-data';
import { Point } from '@vx/point';
import { localPoint } from '@vx/event';
import { withZoom } from '@vx/zoom';
import { Transform } from '@vx/transform';
import { scaleOrdinal } from '@vx/scale';
import { withParentSize } from '@vx/responsive';
import { LinearGradient } from '@vx/gradient';
import { Drag } from '@vx/drag';

const colors = [
  '#025aac',
  '#02cff9',
  '#02efff',
  '#03aeed',
  '#0384d7',
  `#edfdff`,
  '#ab31ff',
  '#5924d7',
  '#d145ff',
  '#1a02b1',
  '#e582ff',
  '#ff00d4',
  '#270eff',
  '#827ce2',
];

function genCircles({ num, width, height }) {
  return Array(num)
    .fill(1)
    .map((d, i) => {
      const radius = 25 - Math.random() * 20;
      return {
        index: i,
        radius,
        x: Math.round(Math.random() * (width - radius * 2) + radius),
        y: Math.round(Math.random() * (height - radius * 2) + radius),
      };
    });
}

class DragDemo extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.parentWidth;
    this.height = this.width * 0.45;
    this.state = {
      items: genCircles({
        num: 185,
        width: this.width,
        height: this.height,
      }),
    };
    this.colorScale = scaleOrdinal({
      range: colors,
      domain: this.state.items.map(d => `${d.x}-${d.y}`),
    });
  }
  componentDidMount() {
    this.forceUpdate();
  }
  render() {
    return (
      <div className="Zoom">
        <svg
          width={this.width}
          height={this.height}
          ref={s => (this.svg = s)}
        >
          <LinearGradient id="stroke" from="#ff00a5" to="#ffc500" />
          <rect
            fill="#c4c3cb"
            width={this.width}
            height={this.height}
            rx={14}
          />
          {this.state.items.map((d, i) => (
            <Drag
              key={`${d.x}-${d.y}`}
              svg={this.svg}
              width={this.width}
              height={this.height}
              onDragStart={({ raise }) => {
                // svg follows the painter model
                // so we need to move the data point
                // to end of the array for it to be drawn
                // "on top of" the other data points
                this.setState((state, props) => {
                  return {
                    items: raise(state.items, i),
                  };
                });
              }}
            >
              {({
                transform,
                dragStart,
                dragEnd,
                dragMove,
                isDragging,
                dx,
                dy,
              }) => {
                return (
                  <circle
                    key={`dot-${i}`}
                    cx={d.x}
                    cy={d.y}
                    r={isDragging ? d.radius + 4 : d.radius}
                    fill={
                      isDragging ? (
                        'url(#stroke)'
                      ) : (
                        this.colorScale(`${d.x}-${d.y}`)
                      )
                    }
                    fillOpacity={0.9}
                    stroke={isDragging ? 'white' : 'transparent'}
                    strokeWidth={2}
                    transform={`${transform}`}
                    onMouseMove={dragMove}
                    onMouseUp={dragEnd}
                    onMouseDown={dragStart}
                  />
                );
              }}
            </Drag>
          ))}
        </svg>

        <style jsx>{`
          .Zoom {
            display: flex;
            flex-direction: column;
            user-select: none;
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
}

export default withParentSize(withZoom(DragDemo));
