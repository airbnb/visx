import React from 'react';
import { Graph as GraphType, DefaultNode as DefaultNodeType, Link as LinkType, LinkProvidedProps, NodeProvidedProps } from './types';
declare type Props<Link, Node> = {
    /** Graph to render nodes and links for. */
    graph?: GraphType<Link, Node>;
    /** Component for rendering a single Link. */
    linkComponent?: React.FunctionComponent<LinkProvidedProps<Link>> | React.ComponentClass<LinkProvidedProps<Link>>;
    /** Component for rendering a single Node. */
    nodeComponent?: React.FunctionComponent<NodeProvidedProps<Node>> | React.ComponentClass<NodeProvidedProps<Node>>;
    /** Top transform offset to apply to links and nodes. */
    top?: number;
    /** Left transform offset to apply to links and nodes. */
    left?: number;
};
export default function Graph<Link = LinkType<DefaultNodeType>, Node = DefaultNodeType>({ graph, linkComponent, nodeComponent, top, left, }: Props<Link, Node>): JSX.Element | null;
export {};
//# sourceMappingURL=Graph.d.ts.map