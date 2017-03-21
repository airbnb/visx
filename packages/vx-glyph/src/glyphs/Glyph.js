import React from 'react';
import cx from 'classnames';
import Group from '@vx/group';

export default function Dot({
  top = 0,
  left = 0,
  className,
  children,
}) {
  return (
    <Group
      className={cx('vx-glyph', className)}
      top={top}
      left={left}
    >
      {children}
    </Group>
  );
}
