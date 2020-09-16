import React from 'react';
import cx from 'classnames';
import { Symbol, symbol, symbolCross } from 'd3-shape';
import Glyph from './Glyph';

export type GlyphCrossProps<Datum> = {
  /** Render function override which is passed the configured path generator. */
  children?: ({ path }: { path: Symbol<any, Datum> }) => React.ReactNode;
  /** classname to apply to glyph path element. */
  className?: string;
  /** Top offset to apply to glyph g element container. */
  top?: number;
  /** Left offset to apply to glyph g element container. */
  left?: number;
  /** Size of cross in px, or an accessor which takes Datum as input and returns a size. */
  size?: number | ((d: Datum) => number);
};

export default function GlyphCross<Datum = any>({
  children,
  className,
  top,
  left,
  size,
  ...restProps
}: GlyphCrossProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof GlyphCrossProps<Datum>>) {
  const path = symbol<Datum>();
  path.type(symbolCross);

  // TS can't differentiate the method overload here
  if (typeof size === 'number') path.size(size);
  else if (size) path.size(size);

  if (children) return <>{children({ path })}</>;

  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-cross', className)} d={path() || ''} {...restProps} />
    </Glyph>
  );
}
