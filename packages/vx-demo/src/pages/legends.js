import React from 'react';
import Show from '../components/show';
import Legends from '../components/tiles/legends';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 10,
        left: 40,
        right: 30,
        bottom: 80,
      }}
      component={Legends}
      title="Legends"
    >
      {`import React from 'react';
import { format } from 'd3-format';
import { scaleQuantize, scaleLinear, scaleOrdinal, scaleThreshold } from '@vx/scale';
import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@vx/glyph';
import {
  Legend,
  LegendLinear,
  LegendQuantile,
  LegendOrdinal,
  LegendSize,
  LegendThreshold,
  LegendItem,
  LegendLabel
} from '@vx/legend';

const oneDecimalFormat = format('.1f');

const sizeScale = scaleLinear({
  domain: [0, 10],
  range: [10, 30]
});

const sizeColorScale = scaleLinear({
  domain: [0, 10],
  range: ['#75fcfc', '#3236b8']
});

const quantileScale = scaleQuantize({
  domain: [0, 0.15],
  range: ['#eb4d70', '#f19938', '#6ce18b', '#78f6ef', '#9096f8']
});

const linearScale = scaleLinear({
  domain: [0, 10],
  range: ['#ed4fbb', '#e9a039']
});

const thresholdScale = scaleThreshold({
  domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
  range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f']
});

const ordinalColorScale = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#66d981', '#71f5ef', '#4899f1', '#7d81f6']
});

const ordinalColor2Scale = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#fae856', '#f29b38', '#e64357', '#8386f7']
});

const shapeScale = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd', 'e'],
  range: [
    <GlyphStar size={50} top={50 / 6} left={50 / 6} fill="#dd59b8" />,
    <GlyphWye size={50} top={50 / 6} left={50 / 6} fill="#de6a9a" />,
    <GlyphTriangle size={50} top={50 / 6} left={50 / 6} fill="#de7d7b" />,
    <GlyphDiamond size={50} top={50 / 6} left={50 / 6} fill="#df905f" />,
    props => (
      <text fontSize="12" dy="1em" dx=".33em" fill="#e0a346">
        $
      </text>
    )
  ]
});

export default () => {
  return (
    <div className="chart">
      <LegendDemo title="Size">
        <LegendSize scale={sizeScale}>
          {labels => {
            return labels.map(label => {
              const size = sizeScale(label.datum);
              const color = sizeColorScale(label.datum);
              return (
                <LegendItem
                  key={\`legend-\${label.text}-\${label.index}\`}
                  onClick={event => {
                    alert(\`clicked: \${JSON.stringify(label)}\`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: '5px 0' }}>
                    <circle fill={color} r={size / 2} cx={size / 2} cy={size / 2} />
                  </svg>
                  <LegendLabel align={'left'} margin={'0 4px'}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendSize>
      </LegendDemo>
      <LegendDemo title="Quantile">
        <LegendQuantile scale={quantileScale}>
          {labels => {
            return labels.map((label, i) => {
              const size = 15;
              return (
                <LegendItem
                  key={\`legend-\${i}\`}
                  onClick={event => {
                    alert(\`clicked: \${JSON.stringify(label)}\`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: '2px 0' }}>
                    <circle fill={label.value} r={size / 2} cx={size / 2} cy={size / 2} />
                  </svg>
                  <LegendLabel align={'left'} margin={'0 4px'}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendQuantile>
      </LegendDemo>
      <LegendDemo title="Linear">
        <LegendLinear
          scale={linearScale}
          labelFormat={(d, i) => {
            if (i % 2 === 0) return oneDecimalFormat(d);
            return '';
          }}
        >
          {labels => {
            return labels.map((label, i) => {
              const size = 15;
              return (
                <LegendItem
                  key={\`legend-quantile-\${i}\`}
                  onClick={event => {
                    alert(\`clicked: \${JSON.stringify(label)}\`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: '2px 0' }}>
                    <circle fill={label.value} r={size / 2} cx={size / 2} cy={size / 2} />
                  </svg>
                  <LegendLabel align={'left'} margin={'0 4px'}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendLinear>
      </LegendDemo>
      <LegendDemo title="Threshold">
        <LegendThreshold scale={thresholdScale}>
          {labels => {
            return labels.reverse().map((label, i) => {
              const size = 15;
              return (
                <LegendItem
                  key={\`legend-quantile-\${i}\`}
                  margin="1px 0"
                  onClick={event => {
                    alert(\`clicked: \${JSON.stringify(label)}\`);
                  }}
                >
                  <svg width={size} height={size}>
                    <rect fill={label.value} width={size} height={size} />
                  </svg>
                  <LegendLabel align={'left'} margin={'2px 0 0 10px'}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendThreshold>
      </LegendDemo>
      <LegendDemo title="Ordinal">
        <LegendOrdinal scale={ordinalColorScale} labelFormat={label => \`\${label.toUpperCase()}\`}>
          {labels => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {labels.map((label, i) => {
                  const size = 15;
                  return (
                    <LegendItem
                      key={\`legend-quantile-\${i}\`}
                      margin={'0 5px'}
                      onClick={event => {
                        alert(\`clicked: \${JSON.stringify(label)}\`);
                      }}
                    >
                      <svg width={size} height={size}>
                        <rect fill={label.value} width={size} height={size} />
                      </svg>
                      <LegendLabel align={'left'} margin={'0 0 0 4px'}>
                        {label.text}
                      </LegendLabel>
                    </LegendItem>
                  );
                })}
              </div>
            );
          }}
        </LegendOrdinal>
      </LegendDemo>
      <LegendDemo title="Custom Legend">
        <Legend scale={shapeScale}>
          {labels => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {labels.map((label, i) => {
                  const size = 15;
                  const color = ordinalColor2Scale(label.datum);
                  const shape = shapeScale(label.datum);
                  const shapeProps = { fill: color };
                  const isValidElement = React.isValidElement(shape);
                  return (
                    <LegendItem
                      key={\`legend-quantile-\${i}\`}
                      margin={'0 4px 0 0'}
                      flexDirection="column"
                      onClick={event => {
                        const { datum, index } = label;
                        alert(\`clicked: \${JSON.stringify({ datum, color, index })}\`);
                      }}
                    >
                      <svg width={size} height={size} style={{ margin: '0 0 8px 0' }}>
                        {!isValidElement && React.createElement(shape, shapeProps)}
                        {isValidElement && React.cloneElement(shape)}
                      </svg>
                      <LegendLabel align={'left'} margin={0}>
                        {label.text}
                      </LegendLabel>
                    </LegendItem>
                  );
                })}
              </div>
            );
          }}
        </Legend>
      </LegendDemo>
    </div>
  );
};

function LegendDemo({ title, children }) {
  return (
    <div className="legend">
      <div className="title">{title}</div>
      {children}
    </div>
  );
}
`}
    </Show>
  );
};
