import React from 'react';
import AreaClosed from '@vx/shape/lib/shapes/AreaClosed';
import { Grid } from '@vx/grid';
import { curveMonotoneX } from '@vx/curve';
import { scaleUtc, scaleLinear, scaleLog, scaleBand, ScaleInput } from '@vx/scale';
import { AxisBottom, SharedAxisProps, AxisScale } from '@vx/axis';
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

export type AxisProps = {
  width: number;
  height: number;
};

export default function Example({ width: outerWidth = 800, height: outerHeight = 800 }: AxisProps) {
  // in svg, margin is subtracted from total width/height
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  if (width < 10) return null;

  interface AxisDemoProps<Scale extends AxisScale> extends SharedAxisProps<Scale> {
    values: ScaleInput<Scale>[];
  }

  const axes: AxisDemoProps<AxisScale<number>>[] = [
    {
      scale: scaleLinear({
        domain: [0, 10],
        range: [0, width],
      }),
      values: [0, 2, 4, 6, 8, 10],
      tickFormat: (v: number) => (v === 10 ? 'last' : (v === 0 && 'first') || `${v}`),
      label: 'linear',
    },
    {
      scale: scaleBand({
        domain: ['a', 'b', 'c', 'd'],
        range: [0, width],
        paddingOuter: 0,
        paddingInner: 1,
      }),
      values: ['a', 'b', 'c', 'd'],
      tickFormat: (v: string) => v,
      label: 'categories',
    },
    {
      scale: scaleUtc({
        domain: [new Date('2020-01-01'), new Date('2020-03-01')],
        range: [0, width],
      }),
      values: [new Date('2020-01-01'), new Date('2020-02-01'), new Date('2020-03-01')],
      tickFormat: (v: Date, i: number) =>
        v.getDate() === 1 ? '🎉' : width > 400 || i % 2 === 0 ? timeFormat('%b %d')(v) : '',
      label: 'time',
    },
    {
      scale: scaleLog({
        domain: [1, 10000],
        range: [0, width],
      }),
      values: [1, 10, 100, 1000, 10000],
      tickFormat: (v: number) => (`${v}`[0] === '1' ? `${v}` : ''),
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
            <Grid<typeof values[0], number>
              xScale={scale}
              yScale={yScale}
              stroke={gridColor}
              width={width}
              height={scaleHeight}
              numTicksRows={2}
              numTicksColumns={numTickColumns}
            />
            <AxisBottom
              top={scaleHeight}
              scale={scale}
              tickFormat={tickFormat}
              stroke={axisColor}
              tickStroke={axisColor}
              tickLabelProps={
                (/* value, index */) => ({
                  fill: tickLabelColor,
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  textAnchor: 'middle',
                })
              }
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
  );
}
