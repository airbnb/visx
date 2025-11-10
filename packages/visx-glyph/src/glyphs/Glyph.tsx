import type { ReactNode } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';

export type GlyphProps = {
  /** Top offset to apply to glyph g element container. */
  top?: number;
  /** Left offset to apply to glyph g element container. */
  left?: number;
  /** classname to apply to glyph g element container. */
  className?: string;
  /** Children to render. */
  children?: ReactNode;
};

export default function Glyph({ top = 0, left = 0, className, children }: GlyphProps) {
  return (
    <Group className={cx('visx-glyph', className)} top={top} left={left}>
      {children}
    </Group>
  );
}
