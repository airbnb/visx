import React from 'react';
import cx from 'classnames';
import { symbol, symbolDiamond } from 'd3-shape';
import Glyph from './Glyph';
import additionalProps from '../util/additionalProps';

export default function GlyphDiamond({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolDiamond);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <path
        className={cx('vx-glyph-diamond', className)}
        d={path()}
        {...additionalProps(restProps)}
      />
      {children}
    </Glyph>
  );
}
