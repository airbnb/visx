import React from 'react';
import cx from 'classnames';
import { scaleLinear, PickD3Scale, ContinuousDomainScaleType } from '@visx/scale';
import { line, curveCardinal } from 'd3-shape';
import { SharedProps } from './types';

export type ViolinPlotProps<Datum extends object> = SharedProps & {
  /** Scale for converting values to pixel offsets. */
  valueScale: PickD3Scale<ContinuousDomainScaleType, number>;
  /** Data used to draw the violin plot glyph. Violin plot values and counts should be able to be derived from data. */
  data: Datum[];
  /** Given an datum, returns the count for it. */
  count?: (d: Datum) => number;
  /** Given an datum, returns the value for it. */
  value?: (d: Datum) => number;
  /** Width of the violin plot glyph. */
  width?: number;
  /** Override render function to fully control the rendering of the ViolinPlot glyph. */
  children?: (providedProps: { path: string }) => React.ReactNode;
};

const defaultCountAccessor = (d: { count?: unknown }) =>
  typeof d.count === 'number' ? d.count : 0;
const defaultValueAccessor = (d: { value?: unknown }) =>
  typeof d.value === 'number' ? d.value : 0;

export default function ViolinPlot<Datum extends object>({
  left = 0,
  top = 0,
  className,
  data,
  width = 10,
  count = defaultCountAccessor,
  value = defaultValueAccessor,
  valueScale,
  horizontal,
  children,
  ...restProps
}: ViolinPlotProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof ViolinPlotProps<Datum>>) {
  const center = (horizontal ? top : left) + width / 2;
  const binCounts = data.map((bin) => count(bin));
  const widthScale = scaleLinear<number>({
    range: [0, width / 2],
    round: true,
    domain: [0, Math.max(...binCounts)],
  });

  let path = '';

  if (horizontal) {
    const topCurve = line<Datum>()
      .x((d) => valueScale(value(d)) ?? 0)
      .y((d) => center - (widthScale(count(d)) ?? 0))
      .curve(curveCardinal);

    const bottomCurve = line<Datum>()
      .x((d) => valueScale(value(d)) ?? 0)
      .y((d) => center + (widthScale(count(d)) ?? 0))
      .curve(curveCardinal);

    const topCurvePath = topCurve(data) || '';
    const bottomCurvePath = bottomCurve([...data].reverse()) || '';
    path = `${topCurvePath} ${bottomCurvePath.replace('M', 'L')} Z`;
  } else {
    const rightCurve = line<Datum>()
      .x((d) => center + (widthScale(count(d)) ?? 0))
      .y((d) => valueScale(value(d)) ?? 0)
      .curve(curveCardinal);

    const leftCurve = line<Datum>()
      .x((d) => center - (widthScale(count(d)) ?? 0))
      .y((d) => valueScale(value(d)) ?? 0)
      .curve(curveCardinal);

    const rightCurvePath = rightCurve(data) || '';
    const leftCurvePath = leftCurve([...data].reverse()) || '';
    path = `${rightCurvePath} ${leftCurvePath.replace('M', 'L')} Z`;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (children) return <>{children({ path })}</>;
  return <path className={cx('visx-violin', className)} d={path} {...restProps} />;
}
