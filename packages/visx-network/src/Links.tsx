import { createElement } from 'react';
import type { FunctionComponent, ComponentClass } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import type { LinkProvidedProps } from './types';

export type LinkProps<Link> = {
  /** Array of links to render. */
  links?: Link[];
  /** Component for rendering a single link. */
  linkComponent:
    | FunctionComponent<LinkProvidedProps<Link>>
    | ComponentClass<LinkProvidedProps<Link>>;
  /** Classname to add to each link parent g element. */
  className?: string;
};

export default function Links<Link>({ links = [], linkComponent, className }: LinkProps<Link>) {
  return (
    <>
      {links.map((link, i) => (
        <Group key={`network-link-${i}`} className={cx('visx-network-link', className)}>
          {createElement(linkComponent, { link })}
        </Group>
      ))}
    </>
  );
}
