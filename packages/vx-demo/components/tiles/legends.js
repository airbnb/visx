import React from 'react';
import { format } from 'd3-format';
import {
  Legend,
  LegendLinear,
  LegendQuantile,
  LegendOrdinal,
  LegendSize,
  LegendThreshold,
} from '@vx/legend';
import {
  scaleQuantize,
  scaleLinear,
  scaleOrdinal,
  scaleThreshold,
} from '@vx/scale';

const oneDecimalFormat = format('.1f');
const twoDecimalFormat = format('.2f');

const quantile = scaleQuantize({
  domain: [0, 0.15],
  range: ['#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801'],
});

const linear = scaleLinear({
  domain: [0, 10],
  range: ['#0068af', '#c00029'],
});

const ordinalColor = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#160689', '#a72297', '#f68e44', '#f8e126'].reverse(),
});

const ordinalShape = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: [
    props =>
      <circle
        {...{
          r: props.width / 2,
          cx: props.width / 2,
          cy: props.width / 2,
        }}
        {...props}
      />,
    props => <rect {...props} />,
    props =>
      <circle
        {...{
          r: props.width / 2,
          cx: props.width / 2,
          cy: props.width / 2,
        }}
        {...props}
      />,
    props =>
      <text fontSize="12" dy="1em" dx=".33em" {...props}>
        $
      </text>,
  ],
});

const threshold = scaleThreshold({
  domain: [0.02, 0.04, 0.06, 0.08, 0.1],
  range: [
    '#f2f0f7',
    '#dadaeb',
    '#bcbddc',
    '#9e9ac8',
    '#756bb1',
    '#54278f',
  ],
});

const size = scaleLinear({
  domain: [0, 10],
  range: [10, 30],
});

const sizeOpacity = scaleLinear({
  domain: [0, 10],
  range: [0.4, 1],
});

function LegendDemo({ title, children }) {
  return (
    <div className="legend">
      <div className="title">{title}</div>
      {children}
      <style jsx>{`
        .legend {
          line-height: .9em;
          color: #333;
          margin: 0 5px 10px;
          float: left;
          clear: top;
          font-size: 10px;
          font-family: arial;
          border: 1px solid #efefef;
          padding: 10px;
          border-radius: 6px;
          flex: initial;
        }
        .title {
          font-size: 12px;
          margin-bottom: 10px;
          font-weight: 100;
        }
      `}</style>
    </div>
  );
}

export default ({ width, height, margin }) => {
  if (width < 10) return null;
  return (
    <div className="chart">
      <div>
        <LegendDemo title="Size">
          <LegendSize
            itemMargin="0"
            shapeMargin="5px 0"
            itemDirection="column"
            scale={size}
            shapeStyle={props => {
              return {
                fill: '#b2212b',
                fillOpacity: sizeOpacity(props.datum),
              };
            }}
            shape={props => {
              const { size } = props;
              return (
                <svg width={size} height={size}>
                  <rect {...props} width={size} height={size} />
                </svg>
              );
            }}
          />
        </LegendDemo>
        <LegendDemo title="Quantile">
          <LegendQuantile shape="circle" scale={quantile} />
        </LegendDemo>
        <LegendDemo title="Linear">
          <LegendLinear
            shape="circle"
            scale={linear}
            labelFormat={(d, i) => {
              if (i % 2 === 0) return oneDecimalFormat(d);
              return '';
            }}
          />
        </LegendDemo>
        <LegendDemo title="Threshold">
          <LegendThreshold
            direction="column-reverse"
            itemDirection="row-reverse"
            labelMargin="0 20px 0 0"
            shapeMargin="1px 0 0"
            scale={threshold}
          />
        </LegendDemo>
        <LegendDemo title="Ordinal">
          <LegendOrdinal
            direction="column"
            scale={ordinalColor}
            shape="rect"
            fill={({ datum }) => ordinalColor(datum)}
            labelFormat={label => `Type ${label.toUpperCase()}`}
          />
        </LegendDemo>
        <LegendDemo title="Custom Legend">
          <Legend
            direction="row"
            itemDirection="column"
            labelMargin="0"
            shapeMargin="0 0 8px 0"
            itemMargin="0 4px 0 0"
            scale={ordinalShape}
            fill={({ datum }) => ordinalColor(datum)}
            shape={props => {
              return (
                <svg width={props.width} height={props.height}>
                  {React.createElement(
                    ordinalShape(props.label.datum),
                    {
                      ...props,
                    },
                  )}
                </svg>
              );
            }}
          />
        </LegendDemo>
      </div>

      <style jsx>{`
        .chart {
          font-family: arial;
          font-weight: 900;
          display: flex;
          flex-direction: column;
        }
        .chart h2 {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};
