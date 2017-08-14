import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import Graph from './Graph';

export default function Links({ links, linkComponent, className }) {
  return (
    <Group>
      {links.map((link, i) =>
        <Group
          className={cx('vx-network-links', className)}
          key={`network-link-${i}`}
        >
          {React.createElement(linkComponent, { link })}
        </Group>,
      )}
    </Group>
  );
}
