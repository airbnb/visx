import React from 'react';
import cx from 'classnames';
import { RadialLine } from 'd3-shape';
import { LinePathProps } from './LinePath';
import { AddSVGProps, RadialLinePathConfig } from '../types';
import { radialLine } from '../util/D3ShapeFactories';

export type LineRadialProps<Datum> = Pick<
  LinePathProps<Datum>,
  'className' | 'data' | 'fill' | 'innerRef'
> & {
  /** Override render function which is passed the configured path generator as input. */
  children?: (args: { path: RadialLine<Datum> }) => React.ReactNode;
} & RadialLinePathConfig<Datum>;

export default function LineRadial<Datum>({
  className,
  angle,
  radius,
  defined,
  curve,
  data = [],
  innerRef,
  children,
  fill = 'transparent',
  ...restProps
}: AddSVGProps<LineRadialProps<Datum>, SVGPathElement>) {
  const path = radialLine<Datum>({
    angle,
    radius,
    defined,
    curve,
  });
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-line-radial', className)}
      d={path(data) || ''}
      fill={fill}
      {...restProps}
    />
  );
}
