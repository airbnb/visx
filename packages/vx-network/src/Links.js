import { Group } from '@vx/group';
import cx from 'classnames';
import React from 'react';

export default function Links({ links, linkComponent, className }) {
  return (
    <Group>
      {links.map((link, i) => (
        <Group className={cx('vx-network-links', className)} key={`network-link-${i}`}>
          {React.createElement(linkComponent, { link })}
        </Group>
      ))}
    </Group>
  );
}
