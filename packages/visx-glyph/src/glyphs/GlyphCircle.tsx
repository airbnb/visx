import React from 'react';
import cx from 'classnames';
import { Symbol, symbol, symbolCircle } from 'd3-shape';
import Glyph from './Glyph';

export type GlyphCircleProps<Datum> = {
  /** Render function override which is passed the configured path generator. */
  children?: ({ path }: { path: Symbol<unknown, Datum> }) => React.ReactNode;
  /** classname to apply to glyph path element. */
  className?: string;
  /** Top offset to apply to glyph g element container. */
  top?: number;
  /** Left offset to apply to glyph g element container. */
  left?: number;
  /** Size of circle in px, or an accessor which takes Datum as input and returns a size. */
  size?: number | ((d: Datum) => number);
};

export default function GlyphCircle<Datum = unknown>({
  children,
  className,
  top,
  left,
  size,
  ...restProps
}: GlyphCircleProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof GlyphCircleProps<Datum>>) {
  const path = symbol<Datum>();
  path.type(symbolCircle);

  // TS can't differentiate the method overload here
  if (typeof size === 'number') path.size(size);
  else if (size) path.size(size);

  if (children) return <>{children({ path })}</>;

  return (
    <Glyph top={top} left={left}>
      <path className={cx('visx-glyph-circle', className)} d={path() || ''} {...restProps} />
    </Glyph>
  );
}
