import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';

BarGroup.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
};

export default function BarGroup({
  data,
  className,
  top,
  left,
}) {
  return (
    <Group
      className={cx('vx-bar-group', className)}
      top={top}
      left={left}
    >

    </Group>
  );
}
