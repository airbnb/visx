import React from 'react';
import cx from 'classnames';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { Marker } from '@vx/marker';
import { curveMonotoneX } from '@vx/curve';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { AreaClosed, LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinePathAnnotation } from '@vx/annotation';
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
    nice: true,
  });
  const yScale = scaleLinear({
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
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f101f6"/>
          <stop offset="100%" stopColor="#01d4f9"/>
        </linearGradient>
        <linearGradient id="linearFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f101f6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#01d4f9" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      <AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        label={'value'}
        stroke={'#1b1a1e'}
        tickTextFill={'#fff'}
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
          stroke={'#1b1a1e'}
          tickStroke={'#1b1a1e'}
        />

        <AreaClosed
          data={dataset[0].data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke={"url('#linear')"}
          fill={"url('#linearFade')"}
          curve={curveMonotoneX}
        />

        <LinePath
          data={dataset[1].data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={"url('#linearFade')"}
          strokeWidth={2}
          strokeDasharray={'5,5'}
          curve={curveMonotoneX}
        />

        <Marker
          from={markerFrom}
          to={markerTo}
          stroke={'white'}
          label={markerLabel}
          labelStroke={'none'}
          labelDx={6}
          labelDy={15}
        />
        <LinePathAnnotation
          label={'expected from deploy'}
          stroke={'white'}
          labelFill={'white'}
          labelStroke={'#1b1a1e'}
          labelStrokeWidth={4}
          points={[
            annotationPoint,
            new Point({
              x: annotationPoint.x + (width / allData.length),
              y: annotationPoint.y - (height / allData.length),
            })
          ]}
        />
      </Group>
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        label={'time'}
        stroke={'#1b1a1e'}
        tickStroke={'#1b1a1e'}
        tickTextFill={'#fff'}
      />
    </svg>
  );
}
