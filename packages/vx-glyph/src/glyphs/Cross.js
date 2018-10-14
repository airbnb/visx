import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { symbol, symbolCross } from 'd3-shape';
import Glyph from './Glyph';

GlyphCross.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};

export default function GlyphCross({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolCross);
  if (size) path.size(size);
  if (children) return children({ path });
  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-cross', className)} d={path()} {...restProps} />
    </Glyph>
  );
}
