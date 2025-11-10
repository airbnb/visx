import type { ComponentClass, FunctionComponent } from 'react';
import { Group } from '@visx/group';
import Links from './Links';
import Nodes from './Nodes';
import DefaultNode from './DefaultNode';
import DefaultLink from './DefaultLink';
import type {
  Graph as GraphType,
  DefaultNode as DefaultNodeType,
  Link as LinkType,
  LinkProvidedProps,
  NodeProvidedProps,
} from './types';

export type GraphProps<Link, Node> = {
  /** Graph to render nodes and links for. */
  graph?: GraphType<Link, Node>;
  /** Component for rendering a single Link. */
  linkComponent?:
    | FunctionComponent<LinkProvidedProps<Link>>
    | ComponentClass<LinkProvidedProps<Link>>;
  /** Component for rendering a single Node. */
  nodeComponent?:
    | FunctionComponent<NodeProvidedProps<Node>>
    | ComponentClass<NodeProvidedProps<Node>>;
  /** Top transform offset to apply to links and nodes. */
  top?: number;
  /** Left transform offset to apply to links and nodes. */
  left?: number;
};

export default function Graph<Link = LinkType<DefaultNodeType>, Node = DefaultNodeType>({
  graph,
  linkComponent = DefaultLink,
  nodeComponent = DefaultNode,
  top,
  left,
}: GraphProps<Link, Node>) {
  return graph ? (
    <Group top={top} left={left}>
      <Links<Link> links={graph.links} linkComponent={linkComponent} />
      <Nodes<Node> nodes={graph.nodes} nodeComponent={nodeComponent} />
    </Group>
  ) : null;
}
