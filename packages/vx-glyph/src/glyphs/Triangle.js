import React from 'react';
import cx from 'classnames';
import { symbol, symbolTriangle } from 'd3-shape';
import Glyph from './Glyph';
import additionalProps from '../util/additionalProps';

export default function GlyphTriangle({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolTriangle);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <path
        className={cx('vx-glyph-triangle', className)}
        d={path()}
        {...additionalProps(restProps)}
      />
      {children}
    </Glyph>
  );
}
