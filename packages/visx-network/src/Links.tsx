import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { LinkProvidedProps } from './types';

export type LinkProps<Link> = {
  /** Array of links to render. */
  links?: Link[];
  /** Component for rendering a single link. */
  linkComponent:
    | string
    | React.FunctionComponent<LinkProvidedProps<Link>>
    | React.ComponentClass<LinkProvidedProps<Link>>;
  /** Classname to add to each link parent g element. */
  className?: string;
};

export default function Links<Link>({ links = [], linkComponent, className }: LinkProps<Link>) {
  return (
    <>
      {links.map((link, i) => (
        <Group key={`network-link-${i}`} className={cx('vx-network-link', className)}>
          {React.createElement(linkComponent, { link })}
        </Group>
      ))}
    </>
  );
}
