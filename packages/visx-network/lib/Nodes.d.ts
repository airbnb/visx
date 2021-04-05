import React from 'react';
import { NodeProvidedProps } from './types';
export declare type NodeProps<Node> = {
    /** Array of links to render. */
    nodes?: Node[];
    /** Component for rendering a single link. */
    nodeComponent: React.FunctionComponent<NodeProvidedProps<Node>> | React.ComponentClass<NodeProvidedProps<Node>>;
    /** Classname to add to each node parent g element. */
    className?: string;
    /** Returns the center x coordinate of a node. */
    x?: (d: Node) => number;
    /** Returns the center y coordinate of a node. */
    y?: (d: Node) => number;
};
export default function Nodes<Node>({ nodes, nodeComponent, className, x, y, }: NodeProps<Node>): JSX.Element;
//# sourceMappingURL=Nodes.d.ts.map