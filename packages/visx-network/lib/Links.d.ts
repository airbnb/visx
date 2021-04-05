import React from 'react';
import { LinkProvidedProps } from './types';
export declare type LinkProps<Link> = {
    /** Array of links to render. */
    links?: Link[];
    /** Component for rendering a single link. */
    linkComponent: React.FunctionComponent<LinkProvidedProps<Link>> | React.ComponentClass<LinkProvidedProps<Link>>;
    /** Classname to add to each link parent g element. */
    className?: string;
};
export default function Links<Link>({ links, linkComponent, className }: LinkProps<Link>): JSX.Element;
//# sourceMappingURL=Links.d.ts.map