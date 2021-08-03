import React from 'react';
import cx from 'classnames';
import { Arc as ArcType } from 'd3-shape';
import { $TSFIXME, AddSVGProps, ArcPathConfig } from '../types';
import { arc } from '../util/D3ShapeFactories';

export type ArcProps<Datum> = {
  /** className applied to path element. */
  className?: string;
  /** A Datum for which to generate an arc. */
  data?: Datum;
  /** Override render function which is passed the configured arc generator as input. */
  children?: (args: { path: ArcType<$TSFIXME, Datum> }) => React.ReactNode;
  /** React ref to the path element. */
  innerRef?: React.Ref<SVGPathElement>;
} & ArcPathConfig<Datum>;

export default function Arc<Datum>({
  className,
  data,
  innerRadius,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  children,
  innerRef,
  ...restProps
}: AddSVGProps<ArcProps<Datum>, SVGPathElement>) {
  const path = arc({
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    padAngle,
    padRadius,
  });

  if (children) return <>{children({ path })}</>;
  if (
    !data &&
    (startAngle == null || endAngle == null || innerRadius == null || outerRadius == null)
  ) {
    console.warn(
      '[@visx/shape/Arc]: expected data because one of startAngle, endAngle, innerRadius, outerRadius is undefined. Bailing.',
    );
    return null;
  }

  return (
    <path
      ref={innerRef}
      className={cx('visx-arc', className)}
      d={path(data as Datum) || ''}
      {...restProps}
    />
  );
}
