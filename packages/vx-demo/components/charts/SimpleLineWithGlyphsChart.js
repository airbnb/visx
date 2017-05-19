import React from 'react';
import cx from 'classnames';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { AxisRight, AxisBottom } from '@vx/axis';
import { scaleTime, scaleLinear } from '@vx/scale';
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
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(allData, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(allData, y)],
    nice: true,
    clamp: true,
  });

  const yFormat = yScale.tickFormat ? yScale.tickFormat() : identity;

  return (
    <svg width={width} height={height}>
      <AxisRight
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
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          numTicksRows={numTicksForHeight(height)}
          numTicksColumns={numTicksForWidth(width)}
        />
        {dataset.map((series, i) => {
          return (
            <LinePath
              key={`chart-line-${i}`}
              data={series.data}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              stroke={series.chart.stroke}
              strokeWidth={series.chart.strokeWidth}
              strokeDasharray={series.chart.strokeDasharray}
              curve={curveMonotoneX}
              glyph={(d, i) => {
                return (
                  <GlyphDot key={`line-point-${i}`}
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
                  </GlyphDot>
                );
              }}
            />
          );
        })}
      </Group>
      <AxisBottom
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
