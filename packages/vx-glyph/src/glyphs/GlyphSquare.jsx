import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { symbol, symbolSquare } from 'd3-shape';
import Glyph from './Glyph';

GlyphSquare.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
};

export default function GlyphSquare({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolSquare);
  if (size) path.size(size);
  if (children) return children({ path });
  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-square', className)} d={path()} {...restProps} />
    </Glyph>
  );
}
