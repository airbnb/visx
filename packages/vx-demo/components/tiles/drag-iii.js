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
import { voronoi, VoronoiPolygon } from '@vx/voronoi';
import { ClipPath } from '@vx/clip-path';

const colors = [
  '#dcf467',
  '#ed40a8',
  '#b1f0ea',
  '#463879',
  '#f5ec5e',
  `#f4e3f4`,
  '#f0534f',
  '#678248',
  '#f7a43c',
  '#e23177',
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
    const items = genCircles({
      num: 35,
      width: this.width,
      height: this.height,
    });
    this.v = voronoi({
      x: d => d.x,
      y: d => d.y,
      width: this.width,
      height: this.height,
    });
    this.state = {
      items,
      voronoiDiagram: this.v(items),
    };
    this.colorScale = scaleOrdinal({
      range: colors,
      domain: this.state.items.map((d, i) => i),
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
          <rect
            fill="#c4c3cb"
            width={this.width}
            height={this.height}
            rx={14}
          />
          {this.state.voronoiDiagram.polygons().map((polygon, i) => {
            return (
              <Drag
                key={`polygon-${i}`}
                svg={this.svg}
                width={this.width}
                height={this.height}
                onDragMove={({ currentPoint }) => {
                  const nextItems = this.state.items.slice();
                  const nextItem = {
                    ...nextItems[i],
                    x: currentPoint.x,
                    y: currentPoint.y,
                  };
                  nextItems[i] = nextItem;
                  this.setState(() => {
                    return {
                      voronoiDiagram: this.v(nextItems),
                      items: nextItems,
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
                    <g
                      onMouseMove={dragMove}
                      onMouseDown={dragStart}
                      onMouseUp={dragEnd}
                      className="cell"
                    >
                      <VoronoiPolygon
                        id={`cell-${i}`}
                        polygon={polygon}
                        stroke="white"
                        strokeWidth={1}
                        fill={isDragging ? 'white' : 'transparent'}
                      />
                      <ClipPath id={`clip-${i}`}>
                        <use xlinkHref={`#cell-${i}`} />
                      </ClipPath>
                      <circle
                        key={`dot-${i}`}
                        clipPath={`url(#clip-${i})`}
                        cx={polygon.data.x}
                        cy={polygon.data.y}
                        r={20}
                        fill={this.colorScale(i)}
                        fillOpacity={0.8}
                      />
                    </g>
                  );
                }}
              </Drag>
            );
          })}
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
          .cell:hover circle {
            stroke: white;
            stroke-width: 2;
          }
        `}</style>
      </div>
    );
  }
}

export default withParentSize(withZoom(DragDemo));
