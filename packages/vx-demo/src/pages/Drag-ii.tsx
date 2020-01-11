import React from 'react';
import Show from '../components/Show';
import DragII from '../components/tiles/Drag-ii';

export default () => {
  return (
    <Show component={DragII} title="Drag II">
      {`import React from 'react';
import { LinePath } from '@vx/shape';
import { Drag } from '@vx/drag';
import { curveBasis } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';

export default class DragII extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
    };
  }

  render() {
    const { width, height } = this.props;
    return (
      <div className="DragII" style={{ touchAction: 'none' }}>
        <svg width={width} height={height}>
          <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
          <rect
            fill="#04002b"
            width={width}
            height={height}
            rx={14}
          />
          {this.state.data.map((d, i) => {
            return (
              <LinePath
                key={\`line-\${i}\`}
                fill={'transparent'}
                stroke="url(#stroke)"
                strokeWidth={3}
                data={d}
                curve={curveBasis}
                x={d => d.x}
                y={d => d.y}
              />
            );
          })}
          <Drag
            width={width}
            height={height}
            resetOnStart={true}
            onDragStart={({ x, y }) => {
              // add the new line with the starting point
              this.setState((state, props) => {
                const newLine = [{ x, y }];
                return {
                  data: state.data.concat([newLine]),
                };
              });
            }}
            onDragMove={({ x, y, dx, dy }) => {
              // add the new point to the current line
              this.setState((state, props) => {
                const nextData = [...state.data];
                const point = [{ x: x + dx, y: y + dy }];
                const i = nextData.length - 1;
                nextData[i] = nextData[i].concat(point);
                return { data: nextData };
              });
            }}
          >
            {({
              x,
              y,
              dx,
              dy,
              isDragging,
              dragStart,
              dragEnd,
              dragMove,
            }) => {
              return (
                <g>
                  {/* decorate the currently drawing line */}
                  {isDragging && (
                    <g>
                      <rect
                        fill="white"
                        width={8}
                        height={8}
                        x={x + dx - 4}
                        y={y + dy - 4}
                        style={{ pointerEvents: 'none' }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={4}
                        fill="transparent"
                        stroke="white"
                        style={{ pointerEvents: 'none' }}
                      />
                    </g>
                  )}
                  {/* create the drawing area */}
                  <rect
                    fill="transparent"
                    width={width}
                    height={height}
                    onMouseDown={dragStart}
                    onMouseUp={dragEnd}
                    onMouseMove={dragMove}
                    onTouchStart={dragStart}
                    onTouchEnd={dragEnd}
                    onTouchMove={dragMove}
                  />
                </g>
              );
            }}
          </Drag>
        </svg>
      </div>
    );
  }
}
`}
    </Show>
  );
};
