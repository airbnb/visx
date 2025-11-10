import type { SVGProps } from 'react';
import cx from 'classnames';
import Glyph from './Glyph';

export type GlyphDotProps = {
  /** classname to apply to glyph path element. */
  className?: string;
  /** Top offset to apply to glyph g element container. */
  top?: number;
  /** Left offset to apply to glyph g element container. */
  left?: number;
  /** Radius of dot. */
  r?: number;
  /** x coordinate of the center of the dot. */
  cx?: number;
  /** y coordinate of the center of the dot. */
  cy?: number;
};

export default function GlyphDot({
  top = 0,
  left = 0,
  className,
  ...restProps
}: GlyphDotProps & Omit<SVGProps<SVGCircleElement>, keyof GlyphDotProps>) {
  return (
    <Glyph top={top} left={left}>
      <circle className={cx('visx-glyph-dot', className)} {...restProps} />
    </Glyph>
  );
}
