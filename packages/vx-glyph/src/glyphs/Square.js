import React from 'react';
import cx from 'classnames';
import { symbol, symbolSquare } from 'd3-shape';
import Glyph from './Glyph';
import additionalProps from '../util/additionalProps';

export default function GlyphSquare({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolSquare);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <path
        className={cx('vx-glyph-square', className)}
        d={path()}
        {...additionalProps(restProps)}
      />
      {children}
    </Glyph>
  );
}
