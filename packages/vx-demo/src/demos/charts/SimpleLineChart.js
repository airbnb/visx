import React from 'react';
import cx from 'classnames';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Axis from '@vx/axis';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Grid from '@vx/grid';
import { extent, max } from 'd3-array';

function identity(x) {
  return x;
}

export default function SimpleLineChart({
  width,
  height,
  margin,
  dataset,
}) {
  if (!Array.isArray(dataset)) dataset = [dataset];

  const allData = dataset.reduce((rec, d) => {
    return rec.concat(d.data)
  }, []);

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // accessors
  const x = d => d.date;
  const y = d => d.value;

  // scales
  const xScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(allData, x),
    nice: true,
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(allData, y)],
    nice: true,
  });

  const yFormat = yScale.tickFormat ? yScale.tickFormat() : identity;

  return (
    <svg width={width} height={height}>
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
      />
      <Group
        top={margin.top}
        left={margin.left}
      >
        <Grid.Grid
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
        />
        {dataset.map((series, i) => {
          return (
            <Shape.LinePath
              key={`chart-line-${i}`}
              data={series.data}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              stroke={series.chart.stroke}
              strokeWidth={series.chart.strokeWidth}
              strokeDasharray={series.chart.strokeDasharray}
              glyph={(d, i) => {
                return (
                  <g key={`line-point-${i}`}>
                    <circle
                      className={cx('vx-linepath-point')}
                      cx={xScale(x(d))}
                      cy={yScale(y(d))}
                      r={5}
                      fill={series.chart.stroke}
                      stroke={series.chart.backgroundColor}
                      strokeWidth={2}
                    />
                    <text
                      x={xScale(x(d))}
                      y={yScale(y(d))}
                      dx={10}
                      fontSize={11}
                    >
                      {yFormat(y(d))}
                    </text>
                  </g>
                );
              }}
            />
          );
        })}
      </Group>
      <Axis.AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
      />
    </svg>
  );
}
