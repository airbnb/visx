import React from 'react';
import { genPhyllotaxis } from '@vx/mock-data';
import { LinePath } from '@vx/shape';
import { Point } from '@vx/point';
import { localPoint } from '@vx/event';
import { withParentSize } from '@vx/responsive';
import { Drag } from '@vx/drag';
import { curveBasis } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';

class DragDemo extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.parentWidth;
    this.height = this.width * 0.45;
    this.state = {
      data: [],
    };
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
          <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
          <rect
            fill="#04002b"
            width={this.width}
            height={this.height}
            rx={14}
          />
          {this.state.data.map((d, i) => {
            return (
              <LinePath
                key={`line-${i}`}
                stroke="url(#stroke)"
                strokeWidth={3}
                data={d}
                curve={curveBasis}
                x={d => d.x}
                y={d => d.y}
                xScale={d => d}
                yScale={d => d}
              />
            );
          })}
          <Drag
            svg={this.svg}
            width={this.width}
            height={this.height}
            onDragStart={({ currentPoint }) => {
              this.setState((state, props) => {
                const newLine = [currentPoint];
                return { data: state.data.concat([newLine]) };
              });
            }}
            onDragMove={({ currentPoint }) => {
              this.setState((state, props) => {
                const nextData = state.data.slice();
                const currentIndex = nextData.length - 1;
                nextData[currentIndex] = nextData[
                  currentIndex
                ].concat([currentPoint]);
                return { data: nextData };
              });
            }}
          >
            {({
              isDragging,
              currentPoint,
              startPoint,
              dragStart,
              dragEnd,
              dragMove,
            }) => {
              return (
                <g>
                  {isDragging && (
                    <g>
                      <rect
                        fill="white"
                        width={8}
                        height={8}
                        x={currentPoint.x - 4}
                        y={currentPoint.y - 4}
                      />
                      <circle
                        cx={startPoint.x}
                        cy={startPoint.y}
                        r={4}
                        fill="transparent"
                        stroke="white"
                      />
                    </g>
                  )}
                  <rect
                    fill="transparent"
                    width={this.width}
                    height={this.height}
                    onMouseDown={dragStart}
                    onMouseUp={dragEnd}
                    onMouseMove={dragMove}
                  />
                </g>
              );
            }}
          </Drag>
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

export default withParentSize(DragDemo);
