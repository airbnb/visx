import React from 'react';
import cx from 'classnames';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Axis from '@vx/axis';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Grid from '@vx/grid';
import { Dot } from '@vx/glyph';
import Curve from '@vx/curve';
import { extent, max } from 'd3-array';

function identity(x) {
  return x;
}

function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

export default ({
  margin,
  dataset,
  width,
  height,
}) => {
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
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(allData, y)],
    nice: true,
    clamp: true,
  });

  const yFormat = yScale.tickFormat ? yScale.tickFormat() : identity;

  return (
    <svg width={width} height={height}>
      <Axis.AxisRight
        top={margin.top}
        left={width - margin.right}
        scale={yScale}
        numTicks={numTicksForHeight(height)}
        label={'value'}
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
          numTicksRows={numTicksForHeight(height)}
          numTicksColumns={numTicksForWidth(width)}
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
              curve={Curve.monotoneX}
              glyph={(d, i) => {
                return (
                  <Dot key={`line-point-${i}`}
                    className={cx('vx-linepath-point')}
                    cx={xScale(x(d))}
                    cy={yScale(y(d))}
                    r={6}
                    fill={series.chart.stroke}
                    stroke={series.chart.backgroundColor}
                    strokeWidth={3}
                  >
                    <text
                      x={xScale(x(d))}
                      y={yScale(y(d))}
                      dx={10}
                      fill={series.chart.stroke}
                      stroke={series.chart.backgroundColor}
                      strokeWidth={6}
                      fontSize={11}
                    >
                      {yFormat(y(d))}
                    </text>
                    <text
                      x={xScale(x(d))}
                      y={yScale(y(d))}
                      dx={10}
                      fill={series.chart.stroke}
                      fontSize={11}
                    >
                      {yFormat(y(d))}
                    </text>
                  </Dot>
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
        numTicks={numTicksForWidth(width)}
        label={'time'}
        hideTicks
      />
    </svg>
  );
}
