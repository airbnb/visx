import React from 'react';
import { Group } from '@vx/group';
import cx from 'classnames';

export default function Glyph({ top = 0, left = 0, className, children }) {
  return (
    <Group className={cx('vx-glyph', className)} top={top} left={left}>
      {children}
    </Group>
  );
}
