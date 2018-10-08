import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';

Glyph.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.any
};

export default function Glyph({ top = 0, left = 0, className, children }) {
  return (
    <Group className={cx('vx-glyph', className)} top={top} left={left}>
      {children}
    </Group>
  );
}
