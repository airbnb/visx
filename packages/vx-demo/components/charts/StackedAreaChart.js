import React from 'react';
import { Group } from '@vx/group';
import { AreaStack } from '@vx/shape';
import { TextOutline } from '@vx/text';
import { browserUsage } from '@vx/mock-data';
import { AxisTop, AxisBottom } from '@vx/axis';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { timeParse } from 'd3-time-format';
import { stack as d3stack } from 'd3-shape';
import round from '../util/round';
import colorScale from '../util/sillyColorScale';
import withState from 'recompose/withState';
import compose from 'recompose/compose';

const enhance = compose(
  withState('selected', 'updateSelected', [])
);

export default enhance(({
  margin,
  width,
  height,
  selected,
  updateSelected,
}) => {
  const data = browserUsage;
  const keys = Object.keys(data[0]).filter(k => k !== 'date');
  const browserNames = [...keys].reverse();

  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const parseDate = timeParse("%Y %b %d");
  const x = d => parseDate(d.date);

  const stack = d3stack().keys(keys);

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
  });

  return (
    <svg height={height} width={width}>
      <AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        tickFormat={(v) => `${round(v * 100)}%`}
        label={'browser market share (%)'}
        stroke={'#1b1a1e'}
        tickTextFill={'#000'}
      />
      <Group top={margin.top} left={margin.left}>
        <AreaStack
          reverse
          top={margin.top}
          left={margin.left}
          keys={keys}
          data={data}
          x={(d) => xScale(x(d.data))}
          y0={(d) => yScale(d[0] / 100)}
          y1={(d) => yScale(d[1] / 100)}
          stroke={(d,i) => colorScale(i)}
          strokeWidth={1}
          fillOpacity={(d,i) => selected.includes(browserNames[i]) ? 0.8 : 0.2}
          fill={(d,i) => colorScale(i)}
          onMouseEnter={(d, i) => event => {
            updateSelected((prevState) => ([browserNames[i]]))
          }}
          onMouseLeave={(d,i) => event => {
            updateSelected(prevState => {
              if (prevState.includes(browserNames[i])) return [];
              return prevState;
            })
          }}
        />
        {stack(data).reverse().map((series,i) => {
          const lastPoint = series[series.length - 1];
          const lastPointY0 = lastPoint[0] / 100;
          const lastPointY1 = lastPoint[1] / 100;

          return (
            <g key={`labels-${series.key}`}>
              {lastPointY1 - lastPointY0 > 0.01 &&
                <TextOutline
                  fontSize={10}
                  x={xMax}
                  y={yScale((lastPointY1 - ((lastPointY1 - lastPointY0) /2)))}
                  dy={'.5em'}
                  textAnchor={'end'}
                  fill="black"
                  outlineStroke={"white"}
                  outlineStrokeWidth={3}
                  fontFamily={"Roboto Mono"}
                >
                  {series.key}
                </TextOutline>
              }
            </g>
          );
        })}
      </Group>
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        label={''}
        tickTextFontSize={9}
        tickTextFontFamily='Roboto Mono'
        stroke={'#1b1a1e'}
        tickStroke={'#1b1a1e'}
        tickTextFill={'black'}
      />
    </svg>
  );
})
