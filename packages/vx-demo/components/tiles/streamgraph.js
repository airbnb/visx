// Inspired by Mike Bostocks Streamgraph bumps
// https://bl.ocks.org/mbostock/4060954

import React from 'react';
import cx from 'classnames';
import { Stack } from '@vx/shape';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { PatternCircles, PatternWaves } from '@vx/pattern';
import { scaleTime, scaleLinear, scaleOrdinal } from '@vx/scale';
import { cityTemperature } from '@vx/mock-data';
import { timeParse } from 'd3-time-format';
import { transpose } from 'd3-array';

// utils
const max = (data, accessor) => Math.max(...data.map(accessor));
const min = (data, accessor) => Math.min(...data.map(accessor));
const extent = (data, accessor) => [
  min(data, accessor),
  max(data, accessor),
];
const range = n => Array.from(Array(n), (d, i) => i);

const numLayers = 20;
const samplesPerLayer = 200;
const bumpsPerLayer = 10;

const keys = range(numLayers);

function bumps(n, m) {
  var a = [],
    i;
  for (i = 0; i < n; ++i) a[i] = 0;
  for (i = 0; i < m; ++i) bump(a, n);
  return a;
}

function bump(a, n) {
  var x = 1 / (0.1 + Math.random()),
    y = 2 * Math.random() - 0.5,
    z = 10 / (0.1 + Math.random());
  for (var i = 0; i < n; i++) {
    var w = (i / n - y) * z;
    a[i] += x * Math.exp(-w * w);
  }
}

export default class Streamgraph extends React.Component {
  render() {
    const {
      width,
      height,
      events = false,
      margin = {
        top: 40,
      },
    } = this.props;
    if (width < 10) return null;

    const layers = transpose(
      keys.map(d => bumps(samplesPerLayer, bumpsPerLayer)),
    );

    const xScale = scaleLinear({
      range: [0, width],
      domain: [0, samplesPerLayer - 1],
    });
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [-30, 50],
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: [
        '#ffc409',
        '#f14702',
        '#262d97',
        'white',
        '#036ecd',
        '#9ecadd',
        '#51666e',
      ],
    });
    const patternScale = scaleOrdinal({
      domain: keys,
      range: [
        'mustard',
        'cherry',
        'navy',
        'transparent',
        'transparent',
        'transparent',
        'transparent',
      ],
    });

    return (
      <svg width={width} height={height}>
        <PatternCircles
          id="mustard"
          height={40}
          width={40}
          radius={5}
          fill="#036ecf"
          complement
        />
        <PatternWaves
          id="cherry"
          height={12}
          width={12}
          fill="transparent"
          stroke="#232493"
          strokeWidth={1}
          complement
        />
        <PatternCircles
          id="navy"
          height={60}
          width={60}
          radius={10}
          fill="white"
          complement
        />
        <PatternCircles
          id="transparent"
          height={60}
          width={60}
          radius={10}
          fill="transparent"
          complement
        />
        <g
          onClick={event => this.forceUpdate()}
          onTouchStart={event => this.forceUpdate()}
        >
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={`#ffdede`}
            rx={14}
          />
          <Stack
            data={layers}
            keys={keys}
            offset="wiggle"
            x={(d, i) => xScale(i)}
            y0={d => yScale(d[0])}
            y1={d => yScale(d[1])}
            render={({ seriesData, path }) => {
              return seriesData.map((series, i) => {
                return (
                  <g key={`series-${series.key}`}>
                    <path
                      d={path(series)}
                      fill={zScale(series.key)}
                    />
                    <path
                      d={path(series)}
                      fill={`url(#${patternScale(series.key)})`}
                    />
                  </g>
                );
              });
            }}
          />
        </g>
      </svg>
    );
  }
}

// // utils
// const max = (data, accessor) => Math.max(...data.map(accessor));
// const min = (data, accessor) => Math.min(...data.map(accessor));
// const extent = (data, accessor) => [
//   min(data, accessor),
//   max(data, accessor),
// ];

// // accessors
// const x = d => parseDate(d.date);
// const y = d => d.value;

// // data formatting + parsing
// const parseDate = timeParse('%Y%m%d');
// const keys = Object.keys(cityTemperature[0]).filter(
//   d => d !== 'date',
// );
// const totals = cityTemperature.reduce((ret, cur) => {
//   const t = keys.reduce((dailyTotal, k) => {
//     dailyTotal += +cur[k];
//     return dailyTotal;
//   }, 0);
//   ret.push(t);
//   return ret;
// }, []);

// export default class Streamgraph extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeKey: undefined };
//     this.handleMouseEnter = this.handleMouseEnter.bind(this);
//     this.handleMouseLeave = this.handleMouseLeave.bind(this);
//   }
//   handleMouseEnter(key) {
//     this.setState({ activeKey: key });
//   }
//   handleMouseLeave() {
//     this.setState({ activeKey: undefined });
//   }
//   render() {
// const {
//   width,
//   height,
//   events = false,
//   margin = {
//     top: 40,
//   },
// } = this.props;
// if (width < 10) return null;

//     // bounds
//     const xMax = width;
//     const yMax = height - margin.top - 100;

//     // scales
//     const xScale = scaleTime({
//       range: [0, xMax],
//       domain: extent(cityTemperature, x),
//     });
//     const yScale = scaleLinear({
//       rangeRound: [yMax, 0],
//       domain: [0, max(totals, d => d)],
//     });
// const zScale = scaleOrdinal({
//   domain: keys,
//   range: ['#ffc409', '#f14702', '#262d97'],
// });
// const patternScale = scaleOrdinal({
//   domain: keys,
//   range: ['mustard', 'cherry', 'navy'],
// });

//     return (
// <div style={{ position: 'relative' }}>
//   <svg width={width} height={height}>
//     <PatternCircles
//       id="mustard"
//       height={40}
//       width={40}
//       radius={5}
//       fill="#036ecf"
//       complement
//     />
//     <PatternWaves
//       id="cherry"
//       height={12}
//       width={12}
//       fill="transparent"
//       stroke="#232493"
//       strokeWidth={1}
//       complement
//     />
//     <PatternCircles
//       id="navy"
//       height={60}
//       width={60}
//       radius={10}
//       fill="white"
//       complement
//     />
//     <rect
//       x={0}
//       y={0}
//       width={width}
//       height={height}
//       fill={`#ffdede`}
//       rx={14}
//     />
//           <Stack
//             data={cityTemperature}
//             keys={keys}
//             offset="wiggle"
//             curve={curveBasis}
//             x={d => xScale(x(d.data))}
//             y0={d => yScale(d[0])}
//             y1={d => yScale(d[1])}
//             fill={d => zScale(d.series.key)}
//             fillOpacity={d =>
//               this.state.activeKey
//                 ? d.series.key !== this.state.activeKey ? 0.4 : 1
//                 : 1}
//           />
//           <Stack
//             data={cityTemperature}
//             keys={keys}
//             offset="wiggle"
//             curve={curveBasis}
//             x={d => xScale(x(d.data))}
//             y0={d => yScale(d[0])}
//             y1={d => yScale(d[1])}
//             fill={d => `url(#${patternScale(d.series.key)})`}
//             onMouseEnter={d => event =>
//               this.handleMouseEnter(d.series.key)}
//             onMouseLeave={d => event => this.handleMouseLeave()}
//           />
//         </svg>
//       </div>
//     );
//   }
// }
