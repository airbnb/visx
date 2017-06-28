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


// LegendQuantile
const quantile = scaleQuantize({
  domain: [0, 0.15],
  range: ['#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801'],
});

function Quantile() {
  return (
    <LegendQuantile
      shape="circle"
      scale={quantile}
    />
  );
}

// LegendLinear
const linear = scaleLinear({
  domain: [0, 10],
  range: ['#0068af', '#c00029'],
});

function Linear() {
  return (
    <LegendLinear
      shape="circle"
      scale={linear}
      labelFormat={(d, i) => {
        if (i % 2 === 0) return oneDecimalFormat(d);
        return '';
      }}
    />
  );
}

// LegendThreshold
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

function Threshold() {
  return (
    <LegendThreshold
      direction="column-reverse"
      itemDirection="row-reverse"
      labelMargin="0 20px 0 0"
      shapeMargin="1px 0 0"
      scale={threshold}
    />
  );
}

// LegendOrdinal
const ordinalColor = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#160689', '#a72297', '#f68e44', '#f8e126'].reverse(),
});

function Ordinal() {
  return (
    <LegendOrdinal
      direction="column"
      scale={ordinalColor}
      shape="rect"
      fill={({ datum }) => ordinalColor(datum)}
      labelFormat={label => \`Type \${label.toUpperCase()}\`}
    />
  );
}

// LegendSize
const size = scaleLinear({
  domain: [0, 10],
  range: [10, 30],
});
const sizeOpacity = scaleLinear({
  domain: [0, 10],
  range: [0.4, 1],
});

function Size() {
  <LegendSize
    scale={size}
    itemMargin="0"
    shapeMargin="5px 0"
    itemDirection="column"
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
}

// Custom Legend
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

function CustomLegend() {
  return (
    <Legend
      direction="row"
      itemDirection="column"
      labelMargin="0"
      shapeMargin="0 0 8px 0"
      itemMargin="0 4px 0 0"
      scale={ordinalShape}
      fill={({ datum }) => ordinalColor(datum)}
      shape={props => {
        const { width, height, label } = props;
        const { datum } = label;
        return (
          <svg width={width} height={height}>
            {React.createElement(ordinalShape(datum), { ...props })}
          </svg>
        );
      }}
    />
  );
}
`}
    </Show>
  );
};
