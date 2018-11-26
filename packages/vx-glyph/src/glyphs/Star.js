import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { symbol, symbolStar } from 'd3-shape';
import Glyph from './Glyph';

GlyphStar.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};

export default function GlyphStar({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolStar);
  if (size) path.size(size);
  if (children) return children({ path });
  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-star', className)} d={path()} {...restProps} />
    </Glyph>
  );
}
