import React from 'react';
import Show from '../components/show';
import DragI from '../components/tiles/drag-i';

export default () => {
  return (
    <Show component={DragI} title="Drag I">
      {`import React from 'react';
import { scaleOrdinal } from '@vx/scale';
import { LinearGradient } from '@vx/gradient';
import { Drag, raise } from '@vx/drag';

const colors = [
  '#025aac',
  '#02cff9',
  '#02efff',
  '#03aeed',
  '#0384d7',
  '#edfdff',
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
        id: i,
        radius,
        x: Math.round(Math.random() * (width - radius * 2) + radius),
        y: Math.round(Math.random() * (height - radius * 2) + radius),
      };
    });
}

export default class DragI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: genCircles({
        num: 185,
        width: props.width,
        height: props.height,
      }),
    };
    this.colorScale = scaleOrdinal({
      range: colors,
      domain: this.state.items.map(d => d.id),
    });
  }
  componentDidMount() {
    this.forceUpdate();
  }
  render() {
    const { width, height } = this.props;
    return (
      <div className="Drag">
        <svg width={width} height={height} ref={s => (this.svg = s)}>
          <LinearGradient id="stroke" from="#ff00a5" to="#ffc500" />
          <rect
            fill="#c4c3cb"
            width={width}
            height={height}
            rx={14}
          />
          {this.state.items.map((d, i) => (
            <Drag
              key={\`\${d.id}\`}
              svg={this.svg}
              width={width}
              height={height}
              onDragStart={() => {
                // svg follows the painter model
                // so we need to move the data item
                // to end of the array for it to be drawn
                // "on top of" the other data items
                this.setState((state, props) => {
                  return {
                    items: raise(state.items, i),
                  };
                });
              }}
            >
              {({
                dragStart,
                dragEnd,
                dragMove,
                isDragging,
                dx,
                dy,
              }) => {
                return (
                  <circle
                    key={\`dot-\${d.id}\`}
                    cx={d.x}
                    cy={d.y}
                    r={isDragging ? d.radius + 4 : d.radius}
                    transform={\`translate(\${dx}, \${dy})\`}
                    onMouseMove={dragMove}
                    onMouseUp={dragEnd}
                    onMouseDown={dragStart}
                    stroke={isDragging ? 'white' : 'transparent'}
                    strokeWidth={2}
                    fillOpacity={0.9}
                    fill={
                      isDragging
                        ? 'url(#stroke)'
                        : this.colorScale(d.id)
                    }
                  />
                );
              }}
            </Drag>
          ))}
        </svg>
      </div>
    );
  }
}`}
    </Show>
  );
};
