import type { Ref, ReactNode } from 'react';
import cx from 'classnames';
import type { Line as LineType } from '@visx/vendor/d3-shape';
import type { AddSVGProps, LinePathConfig } from '../types';
import { line } from '../util/D3ShapeFactories';

export type LinePathProps<Datum> = {
  /** Array of data for which to generate a line shape. */
  data?: Datum[];
  /** React RefObject passed to the path element. */
  innerRef?: Ref<SVGPathElement>;
  /** Override render function which is passed the configured path generator as input. */
  children?: (args: { path: LineType<Datum> }) => ReactNode;
  /** Fill color of the path element. */
  fill?: string;
  /** className applied to path element. */
  className?: string;
} & LinePathConfig<Datum>;

export default function LinePath<Datum>({
  children,
  data = [],
  x,
  y,
  fill = 'transparent',
  className,
  curve,
  innerRef,
  defined = () => true,
  ...restProps
}: AddSVGProps<LinePathProps<Datum>, SVGPathElement>) {
  const path = line<Datum>({ x, y, defined, curve });
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-linepath', className)}
      d={path(data) || ''}
      fill={fill}
      // without this a datum surrounded by nulls will not be visible
      // https://github.com/d3/d3-shape#line_defined
      strokeLinecap="round"
      {...restProps}
    />
  );
}
