import React, { useState } from 'react';
import AreaClosed from '@vx/shape/lib/shapes/AreaClosed';
import { Grid } from '@vx/grid';
import { curveMonotoneX } from '@vx/curve';
import { scaleUtc, scaleLinear, scaleLog, scaleBand, ScaleInput, coerceNumber } from '@vx/scale';
import { AnimatedAxis, Orientation, SharedAxisProps, AxisScale } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { timeFormat } from 'd3-time-format';

export const backgroundColor = '#da7cff';
const axisColor = '#fff';
const tickLabelColor = '#fff';
export const labelColor = '#340098';
const gridColor = '#6e0fca';
const numTickColumns = 5;
const margin = {
  top: 40,
  right: 150,
  bottom: 50,
  left: 50,
};

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

export type AxisProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

export default function Example({
  width: outerWidth = 800,
  height: outerHeight = 800,
  showControls = true,
}: AxisProps) {
  // in svg, margin is subtracted from total width/height
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;
  const [dataToggle, setDataToggle] = useState(true);

  if (width < 10) return null;

  interface AxisDemoProps<Scale extends AxisScale> extends SharedAxisProps<Scale> {
    values: ScaleInput<Scale>[];
  }

  // toggle between two value ranges to demo animation
  const linearValues = dataToggle ? [0, 2, 4, 6, 8, 10] : [6, 8, 10, 12];
  const bandValues = dataToggle ? ['a', 'b', 'c', 'd'] : ['d', 'c', 'b', 'a'];
  const timeValues = dataToggle
    ? [new Date('2020-01-01'), new Date('2020-02-01')]
    : [new Date('2020-02-01'), new Date('2020-03-01')];
  const logValues = dataToggle ? [1, 10, 100, 1000, 10000] : [0.0001, 0.001, 0.1, 1, 10, 100];

  const axes: AxisDemoProps<AxisScale<number>>[] = [
    {
      scale: scaleLinear({
        domain: getMinMax(linearValues),
        range: [0, width],
      }),
      values: linearValues,
      tickFormat: (v: number, index: number, ticks: { value: number; index: number }[]) =>
        index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : `${v}`,
      label: 'linear',
    },
    {
      scale: scaleBand({
        domain: bandValues,
        range: [0, width],
        paddingOuter: 0,
        paddingInner: 1,
      }),
      values: bandValues,
      tickFormat: (v: string) => v,
      label: 'categories',
    },
    {
      scale: scaleUtc({
        domain: getMinMax(timeValues),
        range: [0, width],
      }),
      values: timeValues,
      tickFormat: (v: Date, i: number) =>
        i === 3 ? '🎉' : width > 400 || i % 2 === 0 ? timeFormat('%b %d')(v) : '',
      label: 'time',
    },
    {
      scale: scaleLog({
        domain: getMinMax(logValues),
        range: [0, width],
      }),
      values: logValues,
      tickFormat: (v: number) => {
        const asString = `${v}`;
        return asString.match(/^[10\]\.?[01]*$/) ? asString : '';
      },
      label: 'log',
    },
  ];

  const scalePadding = 50;
  const scaleHeight = height / axes.length - scalePadding;

  const yScale = scaleLinear({
    domain: [100, 0],
    range: [scaleHeight, 0],
  });

  return (
    <>
      <svg width={outerWidth} height={outerHeight}>
        <LinearGradient
          id="vx-axis-gradient"
          from={backgroundColor}
          to={backgroundColor}
          toOpacity={0.5}
        />
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          fill={'url(#vx-axis-gradient)'}
          rx={14}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          {axes.map(({ scale, values, label, tickFormat }, i) => (
            <g key={`scale-${i}`} transform={`translate(0, ${i * (scaleHeight + scalePadding)})`}>
              <AreaClosed
                data={values.map(x => [
                  (scale(x) ?? 0) +
                    ('bandwidth' in scale && typeof scale!.bandwidth !== 'undefined'
                      ? scale.bandwidth!() / 2
                      : 0),
                  yScale(10 + Math.random() * 90),
                ])}
                yScale={yScale}
                curve={curveMonotoneX}
                fill={gridColor}
                fillOpacity={0.2}
              />
              <Grid
                xScale={scale}
                yScale={yScale}
                stroke={gridColor}
                width={width}
                height={scaleHeight}
                numTicksRows={2}
                numTicksColumns={numTickColumns}
              />
              <AnimatedAxis
                orientation={Orientation.bottom}
                top={scaleHeight}
                scale={scale}
                tickFormat={tickFormat}
                stroke={axisColor}
                tickStroke={axisColor}
                tickLabelProps={() => ({
                  fill: tickLabelColor,
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  textAnchor: 'middle',
                })}
                tickValues={label === 'log' || label === 'time' ? undefined : values}
                numTicks={label === 'time' ? 6 : undefined}
                label={label}
                labelProps={{
                  x: width + 30,
                  y: -10,
                  fill: labelColor,
                  fontSize: 18,
                  strokeWidth: 0,
                  stroke: '#fff',
                  paintOrder: 'stroke',
                  fontFamily: 'sans-serif',
                  textAnchor: 'start',
                }}
              />
            </g>
          ))}
        </g>
      </svg>
      {showControls && <button onClick={() => setDataToggle(!dataToggle)}>Update scales</button>}
    </>
  );
}
