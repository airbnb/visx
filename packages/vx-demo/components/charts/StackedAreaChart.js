import React from 'react';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Axis from '@vx/axis';
import Shape from '@vx/shape';
import Curve from '@vx/curve';
import Text from '@vx/text';
import { extent, max } from 'd3-array';
import { stack as d3stack } from 'd3-shape';
import { timeParse } from 'd3-time-format';
import round from '../util/round';
import colorScale from '../util/sillyColorScale';

export default ({
  margin,
  width,
  height,
}) => {
  const data = Mock.browserUsage;
  const keys = Object.keys(data[0]).filter(k => k !== 'date');

  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const parseDate = timeParse("%Y %b %d");
  const x = d => parseDate(d.date);

  const stack = d3stack().keys(keys);

  const xScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
  });

  return (
    <svg height={height} width={width}>
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        tickFormat={(v) => `${round(v * 100)}%`}
        label={'browser market share (%)'}
        stroke={'#1b1a1e'}
        tickTextFill={'#000'}
      />
      <Group top={margin.top} left={margin.left}>
        <Shape.AreaStack
          top={margin.top}
          left={margin.left}
          keys={keys}
          data={data}
          x={(d) => xScale(x(d.data))}
          y0={(d) => yScale(d[0] / 100)}
          y1={(d) => yScale(d[1] / 100)}
          fill={(d,i) => colorScale(i)}
          fillOpacity={0.8}
          stroke={(d,i) => colorScale(i)}
          strokeWidth={1}
          reverse
        />
        {stack(data).reverse().map((series,i) => {
          const lastPoint = series[series.length - 1];
          const lastPointY0 = lastPoint[0] / 100;
          const lastPointY1 = lastPoint[1] / 100;

          return (
            <g key={`labels-${series.key}`}>
              {lastPointY1 - lastPointY0 > 0.01 &&
                <Text.TextOutline
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
                </Text.TextOutline>
              }
            </g>
          );
        })}
      </Group>
      <Axis.AxisBottom
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
}
