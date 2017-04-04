import React from 'react';
import cx from 'classnames';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Axis from '@vx/axis';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Grid from '@vx/grid';
import Glyph from '@vx/glyph';
import Responsive from '@vx/responsive';
import Marker from '@vx/marker';
import Annotation from '@vx/annotation';
import Text from '@vx/text';
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

function SimpleLineChart({
  margin,
  dataset,
  screenWidth,
  screenHeight,
}, state, n) {
  if (!Array.isArray(dataset)) dataset = [dataset];

  const width = 480;
  const height = width / 2;

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
  const xFormat = xScale.tickFormat ? xScale.tickFormat() : identity;

  const markerDatum = allData[3];
  const markerLabel = `Deploy`;
  const markerFrom = new Point({
    x: xScale(x(markerDatum)),
    y: 0,
  });
  const markerTo = new Point({
    x: xScale(x(markerDatum)),
    y: yMax,
  });

  const annotationPoint = new Point({
    x: xScale(x(allData[3])),
    y: yScale(y(allData[3])),
  });

  return (
    <svg width={width} height={height}>
      <rect
        width={width}
        height={height}
        fill={'white'}
        stroke={'black'}
        strokeWidth={1}
      />
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        label={'value'}
      />
      <Group
        top={margin.top}
        left={margin.left}
      >
        <text
          dy={-margin.top / 2}
          dx={(width / 2) - margin.left}
          textAnchor='middle'
          fontSize="16"
          fontFamily="Arial"
          fill="black"
        >
          Simple line chart with a marker and annotation
        </text>
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
            />
          );
        })}
        <Marker
          from={markerFrom}
          to={markerTo}
          label={markerLabel}
          labelDx={6}
          labelDy={15}
        />
        <Annotation.LinePathAnnotation
          label={'expected from deploy'}
          labelFill={'black'}
          labelStrokeWidth={2}
          labelAnchor="end"
          points={[
            annotationPoint,
            new Point({
              x: annotationPoint.x - (width / allData.length),
              y: annotationPoint.y - (height / allData.length),
            })
          ]}
        />
      </Group>
      <Axis.AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        label={'time'}
      />
    </svg>
  );
}

export default Responsive.withScreenSize(SimpleLineChart);
