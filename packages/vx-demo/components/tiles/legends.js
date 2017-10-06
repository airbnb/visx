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

import {
  GlyphStar,
  GlyphWye,
  GlyphTriangle,
  GlyphDiamond,
} from '@vx/glyph';

const oneDecimalFormat = format('.1f');
const twoDecimalFormat = format('.2f');

const quantile = scaleQuantize({
  domain: [0, 0.15],
  range: ['#eb4d70', '#f19938', '#6ce18b', '#78f6ef', '#9096f8'],
});

const linear = scaleLinear({
  domain: [0, 10],
  range: ['#ed4fbb', '#e9a039'],
});

const ordinalColor = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#7d81f6', '#4899f1', '#71f5ef', '#66d981'].reverse(),
});

const ordinalColor2 = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#8386f7', '#e64357', '#f29b38', '#fae856'].reverse(),
});

const ordinalShape = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd', 'e'],
  range: [
    <GlyphStar size={50} top={50 / 6} left={50 / 6} fill="#dd59b8" />,
    <GlyphWye size={50} top={50 / 6} left={50 / 6} fill="#de6a9a" />,
    <GlyphTriangle
      size={50}
      top={50 / 6}
      left={50 / 6}
      fill="#de7d7b"
    />,
    <GlyphDiamond
      size={50}
      top={50 / 6}
      left={50 / 6}
      fill="#df905f"
    />,
    props => (
      <text fontSize="12" dy="1em" dx=".33em" fill="#e0a346">
        $
      </text>
    ),
  ],
});

const threshold = scaleThreshold({
  domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
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

const sizeColor = scaleLinear({
  domain: [0, 10],
  range: ['#75fcfc', '#3236b8'],
});

function LegendDemo({ title, children }) {
  return (
    <div className="legend">
      <div className="title">{title}</div>
      {children}
      <style jsx>{`
        .legend {
          line-height: 0.9em;
          color: #efefef;
          font-size: 10px;
          font-family: arial;
          padding: 10px 10px;
          float: left;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          margin: 5px 5px;
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
      <LegendDemo title="Size">
        <LegendSize
          itemMargin="0"
          shapeMargin="5px 0"
          itemDirection="row"
          scale={size}
          shapeStyle={props => {
            return {
              fill: sizeColor(props.datum),
            };
          }}
          shape={props => {
            const { size } = props;
            return (
              <svg width={size} height={size}>
                <circle
                  {...props}
                  r={size / 2}
                  cx={size / 2}
                  cy={size / 2}
                />
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
          itemDirection="row"
          labelMargin="2px 0 0 10px"
          shapeMargin="1px 0 0"
          scale={threshold}
        />
      </LegendDemo>
      <LegendDemo title="Ordinal">
        <LegendOrdinal
          direction="row"
          itemDirection="row"
          shapeMargin="0"
          labelMargin="0 0 0 4px"
          itemMargin="0 5px"
          scale={ordinalColor}
          shape="rect"
          fill={({ datum }) => ordinalColor(datum)}
          labelFormat={label => `${label.toUpperCase()}`}
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
          fill={({ datum }) => ordinalColor2(datum)}
          shapeWidth={15}
          shape={props => {
            return (
              <svg width={props.width} height={props.height}>
                {!React.isValidElement(
                  ordinalShape(props.label.datum),
                ) &&
                  React.createElement(
                    ordinalShape(props.label.datum),
                    {
                      ...props,
                    },
                  )}
                {React.isValidElement(
                  ordinalShape(props.label.datum),
                ) &&
                  React.cloneElement(ordinalShape(props.label.datum))}
              </svg>
            );
          }}
        />
      </LegendDemo>

      <style jsx>{`
        .chart {
          font-family: arial;
          font-weight: 900;
          background-color: black;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
          padding: 20px 20px 20px 28px;
          overflow-y: auto;
        }
        .chart h2 {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};
