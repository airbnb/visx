import React from 'react';
import cx from 'classnames';
import { symbol, symbolCross } from 'd3-shape';
import Glyph from './Glyph';
import additionalProps from '../util/additionalProps';

export default function GlyphCross({
  children,
  className,
  top,
  left,
  size,
  ...restProps
}) {
  const path = symbol();
  path.type(symbolCross);
  if (size) path.size(size);
  return (
    <Glyph
      top={top}
      left={left}
      className={cx('vx-glyph-cross', className)}
    >
      <path
        d={path()}
        {...additionalProps(restProps)}
      />
      {children}
    </Glyph>
  );
}
