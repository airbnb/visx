import React from 'react';
import cx from 'classnames';
import { Symbol, symbol, symbolSquare } from 'd3-shape';
import Glyph from './Glyph';

export type GlyphSquareProps<Datum> = {
  /** Render function override which is passed the configured path generator. */
  children?: ({ path }: { path: Symbol<unknown, Datum> }) => React.ReactNode;
  /** classname to apply to glyph path element. */
  className?: string;
  /** Top offset to apply to glyph g element container. */
  top?: number;
  /** Left offset to apply to glyph g element container. */
  left?: number;
  /** Size of square in px, or an accessor which takes Datum as input and returns a size. */
  size?: number | ((d: Datum) => number);
};

export default function GlyphSquare<Datum = unknown>({
  children,
  className,
  top,
  left,
  size,
  ...restProps
}: GlyphSquareProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof GlyphSquareProps<Datum>>) {
  const path = symbol<Datum>();
  path.type(symbolSquare);

  // TS can't differentiate the method overload here
  if (typeof size === 'number') path.size(size);
  else if (size) path.size(size);

  if (children) return <>{children({ path })}</>;

  return (
    <Glyph top={top} left={left}>
      <path className={cx('visx-glyph-square', className)} d={path() || ''} {...restProps} />
    </Glyph>
  );
}
