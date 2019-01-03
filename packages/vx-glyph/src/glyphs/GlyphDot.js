import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Glyph from './Glyph';

GlyphDot.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};

export default function GlyphDot({ top = 0, left = 0, className, children, ...restProps }) {
  return (
    <Glyph top={top} left={left}>
      <circle className={cx('vx-glyph-dot', className)} {...restProps} />
    </Glyph>
  );
}
