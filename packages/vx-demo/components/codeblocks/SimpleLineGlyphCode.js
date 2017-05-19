import React from 'react';
import Codeblock from './Codeblock';

export default ({}) => {
  return (
    <Codeblock>
      {`// SimpleLineWithGlyphsChart.js
function SimpleLineWithGlyphsChart({
  margin,
  dataset,
  screenWidth,
  screenHeight,
}) {
  if (!Array.isArray(dataset)) dataset = [dataset];

  const allData = dataset.reduce((rec, d) => {
    return rec.concat(d.data)
  }, []);

  const width = screenWidth / 1.5;
  const height = width / 2;

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
            <Shape.LinePath
              key={'chart-line-{i}'}
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
                  <GlyphDot key={'line-point-{i}'}
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
                  </Glyph.Dot>
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

export default withScreenSize(SimpleLineWithGlyphsChart);`}
    </Codeblock>
  );
}
