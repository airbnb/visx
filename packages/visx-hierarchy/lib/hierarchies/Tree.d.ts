import React from 'react';
import { HierarchyNode, HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy';
export declare type NodeComponentProps<Datum> = {
    node: HierarchyPointNode<Datum>;
};
export declare type LinkComponentProps<Datum> = {
    link: HierarchyPointLink<Datum>;
};
export declare type TreeProps<Datum> = {
    /** The root hierarchy node from which to derive the tree layout. */
    root: HierarchyNode<Datum>;
    /** Render override function which is passed the computed cluster layout data. */
    children?: (pack: HierarchyPointNode<Datum>) => React.ReactNode;
    /** top offset applied to the g element container. */
    top?: number;
    /** left offset applied to the g element container. */
    left?: number;
    /** className applied to the g element container. */
    className?: string;
    /**
     * Sets this tree layout’s size to the specified two-element array of numbers `[width, height]`.
     * This is an arbitrary coordinate system, e.g., for a radial layout, a size of `[360, radius]`
     * corresponds to a breadth of 360° and a depth of radius.
     */
    size?: [number, number];
    /**
     * Sets this tree layout’s node size to the specified two-element array of numbers `[width, height]`.
     * If unset, layout size is used instead.  When a node size is specified, the root node is always
     * positioned at `⟨0, 0⟩`.
     */
    nodeSize?: [number, number];
    /**
     * Sets the layout's separation accessor used to determine the separation of neighboring nodes.
     * See https://github.com/d3/d3-hierarchy/blob/master/README.md#tree_separation for more.
     */
    separation?: (a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => number;
    /** Component which renders a single cluster link, passed the link object. */
    linkComponent?: React.FunctionComponent<LinkComponentProps<Datum>> | React.ComponentClass<LinkComponentProps<Datum>>;
    /** Component which renders a single cluster node, passed the node object. */
    nodeComponent?: React.FunctionComponent<NodeComponentProps<Datum>> | React.ComponentClass<NodeComponentProps<Datum>>;
};
export default function Tree<Datum>({ top, left, className, root, size, nodeSize, separation, children, linkComponent, nodeComponent, }: TreeProps<Datum>): JSX.Element;
//# sourceMappingURL=Tree.d.ts.map