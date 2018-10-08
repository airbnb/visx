import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';

Links.propTypes = {
  links: PropTypes.array,
  linkComponent: PropTypes.any,
  className: PropTypes.string
};

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
