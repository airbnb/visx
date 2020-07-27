import React from 'react';
import cx from 'classnames';
import { scaleLinear, PickD3Scale, ContinuousDomainScaleType } from '@vx/scale';
import { line, curveCardinal } from 'd3-shape';
import { BinDatum, SharedProps } from './types';

export type ViolinPlotProps<ScaleInput> = SharedProps & {
  /** Scale for converting values to pixel offsets. */
  valueScale: PickD3Scale<ContinuousDomainScaleType, number>;
  /** Data used to draw the violin plot glyph. Violin plot values and counts should be able to be derived from data. */
  data: ScaleInput[];
  /** Given an ScaleInput datum, returns the count for it. */
  count?: (d: ScaleInput) => number;
  /** Given an ScaleInput datum, returns the value for it. */
  value?: (d: ScaleInput) => number;
  /** Width of the violin plot glyph. */
  width?: number;
  /** Override render function to fully control the rendering of the ViolinPlot glyph. */
  children?: (providedProps: { path: string }) => React.ReactNode;
};

export default function ViolinPlot<ScaleInput extends object = BinDatum>({
  left = 0,
  top = 0,
  className,
  data,
  width = 10,
  count = (d?: { count?: number }) => d?.count || 0,
  value = (d?: { value?: number }) => d?.value || 0,
  valueScale,
  horizontal,
  children,
  ...restProps
}: ViolinPlotProps<ScaleInput> &
  Omit<React.SVGProps<SVGPathElement>, keyof ViolinPlotProps<ScaleInput>>) {
  const center = (horizontal ? top : left) + width / 2;
  const binCounts = data.map(bin => count(bin));
  const widthScale = scaleLinear<number>({
    range: [0, width / 2],
    round: true,
    domain: [0, Math.max(...binCounts)],
  });

  let path = '';

  if (horizontal) {
    const topCurve = line<ScaleInput>()
      .x(d => valueScale(value(d)))
      .y(d => center - widthScale(count(d)))
      .curve(curveCardinal);

    const bottomCurve = line<ScaleInput>()
      .x(d => valueScale(value(d)))
      .y(d => center + widthScale(count(d)))
      .curve(curveCardinal);

    const topCurvePath = topCurve(data) || '';
    const bottomCurvePath = bottomCurve([...data].reverse()) || '';
    path = `${topCurvePath} ${bottomCurvePath.replace('M', 'L')} Z`;
  } else {
    const rightCurve = line<ScaleInput>()
      .x(d => center + widthScale(count(d)))
      .y(d => valueScale(value(d)))
      .curve(curveCardinal);

    const leftCurve = line<ScaleInput>()
      .x(d => center - widthScale(count(d)))
      .y(d => valueScale(value(d)))
      .curve(curveCardinal);

    const rightCurvePath = rightCurve(data) || '';
    const leftCurvePath = leftCurve([...data].reverse()) || '';
    path = `${rightCurvePath} ${leftCurvePath.replace('M', 'L')} Z`;
  }
  if (children) return <>{children({ path })}</>;
  return <path className={cx('vx-violin', className)} d={path} {...restProps} />;
}
